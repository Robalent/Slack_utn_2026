/*
Capa de servicios de autenticación.
Acá vive la lógica de negocio de cada endpoint de auth:
validaciones, reglas, acceso al repository, tokens y envío de mails.
Los controllers solo extraen datos de la request, llaman al servicio
y arman la respuesta HTTP.
*/
import jwt from 'jsonwebtoken'
import ENVIRONMENT from '../config/environment.config.js'
import mailer_transporter from '../config/mailer.config.js'
import user_repository from '../repositories/user.repository.js'
import { compareHash, generateHash } from '../utils/bcrypt.util.js'
import { getVerificationEmail } from '../utils/email-templates/verification.email.js'
import { getResetPasswordEmail } from '../utils/email-templates/reset-password.email.js'
import ServerError from '../utils/error.util.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Los emails se guardan y comparan en minúsculas y sin espacios de más
function normalizeEmail(email) {
    return email.trim().toLowerCase()
}

function assertEmailFormat(email) {
    if (!EMAIL_REGEX.test(email)) {
        throw new ServerError('Email is incorrect', 400)
    }
}

// Token de verificación de email: JWT firmado con payload { email }, expira en 7 días
function createVerificationToken(email) {
    return jwt.sign(
        { email: email },
        ENVIRONMENT.JWT_SECRET_KEY,
        { expiresIn: '7d' }
    )
}

/*
Token de restablecimiento de contraseña: JWT de corta duración (1 hora)
con payload { email, type: 'reset_password' }.
El campo type evita que un token de otro flujo (ej: verificación de email)
pueda usarse para cambiar la contraseña.
*/
const RESET_TOKEN_EXPIRES_IN = '1h'

function createResetToken(email) {
    return jwt.sign(
        { email: email, type: 'reset_password' },
        ENVIRONMENT.JWT_SECRET_KEY,
        { expiresIn: RESET_TOKEN_EXPIRES_IN }
    )
}

/*
Verifica la firma del token de restablecimiento y devuelve el email.
Si el token es inválido o expiró, lanza un error controlado.
*/
function verifyResetToken(reset_token) {
    let payload
    try {
        payload = jwt.verify(reset_token, ENVIRONMENT.JWT_SECRET_KEY)
    } catch (error) {
        throw new ServerError('El token es inválido o ya expiró. Pedí uno nuevo', 400)
    }

    if (payload.type !== 'reset_password') {
        throw new ServerError('El token es inválido o ya expiró. Pedí uno nuevo', 400)
    }

    return payload.email
}

async function sendVerificationEmail(email, verify_email_token) {
    const { subject, html } = getVerificationEmail({ verification_token: verify_email_token })

    await mailer_transporter.sendMail({
        to: email,
        from: ENVIRONMENT.GMAIL_USER,
        subject: subject,
        html: html
    })
}


/*
Registrar un usuario nuevo:
- valida datos y formato de email
- verifica que el email no esté en uso
- guarda el usuario con el password hasheado
- genera el token de verificación y envía el mail de bienvenida
*/
export async function registerUser({ username, email, password }) {
    if (!username || !email || !password) {
        throw new ServerError(
            "Email, password and username are required",
            400
        )
    }

    assertEmailFormat(email)

    // validar si el email ya está registrado
    const user_already_exist = await user_repository.getByEmail(email)
    if (user_already_exist) {
        throw new ServerError(
            "Email is already used",
            400
        )
    }

    const password_hash = await generateHash(password)

    await user_repository.create(username, email, password_hash)

    const verify_email_token = createVerificationToken(email)

    await sendVerificationEmail(email, verify_email_token)
}


/*
Iniciar sesión:
- valida datos y formato de email
- busca al usuario por email
- compara la contraseña contra el hash guardado en DB
- verifica que el email esté validado
- crea y devuelve el token de sesión (auth_token)
*/
export async function loginUser({ email, password }) {
    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
        throw new ServerError(
            "Email and password are required",
            400
        )
    }

    const normalized_email = normalizeEmail(email) // .trim() elimina espacios al inicio y al final. .toLowerCase() convierte el texto a minúsculas.

    if (!normalized_email || !password.trim()) {
        throw new ServerError(
            "Email and password are required",
            400
        )
    }

    assertEmailFormat(normalized_email)

    const user = await user_repository.getByEmail(normalized_email)
    if (!user) {
        throw new ServerError(
            "Invalid email or password",
            401
        )
    }

    const isPasswordValid = await compareHash(password, user.password)
    if (!isPasswordValid) {
        throw new ServerError(
            "Invalid email or password",
            401
        )
    }

    if (!user.email_verificado) {
        throw new ServerError(
            'Email no verificado',
            403
        )
    }

    // Crear un token firmado de sesión
    const auth_token = jwt.sign(
        {
            // Aca va la info que queremos guardar en la credencial
            id: user._id,
            name: user.nombre,
            email: user.email
        },
        ENVIRONMENT.JWT_SECRET_KEY // firmamos con esto
    )

    return { auth_token }
}


/*
Verificar el email de un usuario:
- valida que llegue el token
- verifica la firma y obtiene el email del payload
- busca al usuario y valida su estado (exista, activo, no verificado aún)
- marca el email como verificado
*/
export async function verifyUserEmail({ verification_token }) {
    if (!verification_token) {
        throw new ServerError('Token de verificación faltante', 400)
    }

    //verificar el token
    const { email } = jwt.verify(verification_token, ENVIRONMENT.JWT_SECRET_KEY)

    const user_found = await findActiveUnverifiedUser(email)

    await user_repository.updateById(
        user_found._id,
        {
            email_verificado: true
        }
    )
}


/*
Reenviar el email de verificación:
El usuario que todavía no verificó su email puede pedir un nuevo token.
- valida formato de email
- busca al usuario y valida su estado
- re-crea el token de verificación (mismo formato que en register)
- reenvía el mail
*/
export async function resendUserVerificationEmail({ email }) {
    if (!email) {
        throw new ServerError('Email requerido', 400)
    }

    const normalized_email = normalizeEmail(email)

    assertEmailFormat(normalized_email)

    await findActiveUnverifiedUser(normalized_email)

    const verify_email_token = createVerificationToken(normalized_email)

    await sendVerificationEmail(normalized_email, verify_email_token)
}


/*
Solicitar el restablecimiento de contraseña:
- valida formato de email
- si el usuario existe, crea un token de reset (1h) y le envía un mail
  con el link para crear una contraseña nueva
- si el usuario NO existe, no envía nada pero responde igual.
  Así no revelamos qué emails están registrados en la plataforma.
*/
export async function forgotPassword({ email }) {
    if (!email) {
        throw new ServerError('Email requerido', 400)
    }

    const normalized_email = normalizeEmail(email)

    assertEmailFormat(normalized_email)

    const user_found = await user_repository.getByEmail(normalized_email)

    if (user_found) {
        const reset_token = createResetToken(normalized_email)

        const { subject, html } = getResetPasswordEmail({ reset_token: reset_token })

        await mailer_transporter.sendMail({
            to: normalized_email,
            from: ENVIRONMENT.GMAIL_USER,
            subject: subject,
            html: html
        })
    }
}


/*
Restablecer la contraseña con un token válido:
- valida que llegue el token y la nueva contraseña
- verifica la firma del token y obtiene el email
- busca al usuario y valida su estado (exista, activo)
- guarda la nueva contraseña hasheada
*/
export async function resetPassword({ reset_token, password }) {
    if (!reset_token) {
        throw new ServerError('Token de restablecimiento faltante', 400)
    }

    if (!password || !password.trim()) {
        throw new ServerError('La nueva contraseña es requerida', 400)
    }

    const email = verifyResetToken(reset_token)

    const user_found = await user_repository.getByEmail(email)

    if (!user_found) {
        throw new ServerError('Usuario no encontrado', 404)
    }

    if (!user_found.activo) {
        throw new ServerError('Usuario desactivado. Contactate con soporte si consideras que es un error')
    }

    const password_hash = await generateHash(password)

    await user_repository.updateById(
        user_found._id,
        {
            password: password_hash
        }
    )
}


/*
Regla compartida por verifyUserEmail y resendUserVerificationEmail:
el usuario debe existir, estar activo y no estar verificado todavía.
Recibe el email normalizado (minúsculas, sin espacios).
*/
async function findActiveUnverifiedUser(email) {
    const user_found = await user_repository.getByEmail(email)

    if (!user_found) {
        throw new ServerError('Usuario no encontrado', 404)
    }

    if (!user_found.activo) {
        throw new ServerError('Usuario desactivado. Contactate con soporte si consideras que es un error')
    }

    if (user_found.email_verificado) {
        throw new ServerError('Ya estas verificado', 400)
    }

    return user_found
}
