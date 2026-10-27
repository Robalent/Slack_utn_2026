
// Para enviar en una request HTTP info a una API usamos el body
// Las consultas (request) tipo GET NO tienen body 
// El body puede ser de distintos tipos de dato:
//  Vamos a usar JSON, para poder usar JSON nuestra API debe estar preparada para recibir ese tipo de información

import { response } from "express"
import ENVIRONMENT from "../config/environment.config.js"
import mailer_transporter from "../config/mailer.config.js"
import user_repository from "../repositories/user.repository.js"
import { compareHash, generateHash } from "../utils/bcrypt.util.js"
import ServerError from "../utils/error.util.js"
import bcrypt from "bcrypt" 
import jwt from 'jsonwebtoken'


export async function register(request, response) {
    console.log("[REGISTER]", request.body)

    const { username, email, password } = request.body

    if (!username || !email || !password) {
        throw new ServerError(
            "Email, password ans username us required",
            400
        )
    }

    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
        throw new ServerError(
            "Email is incorrect",
            400
        )
    }

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

    const verify_email_token = jwt.sign(
        {
            email: email
        },
        ENVIRONMENT.JWT_SECRET_KEY,
        {
            expiresIn:'7d' //expira en 7 días
        }
    )

    await mailer_transporter.sendMail(
        {
            to: email,
            from: ENVIRONMENT.GMAIL_USER,
            subject: "verifica tu cuenta",
            html: 
            `
                <body>
                    <h1>Bienvenido a nuestra plataforma</h1>
                    <p>Necesitamos verificar este correo electronico</p>
                    <a href='${ENVIRONMENT.URL_BACKEND}/api/auth/verify-email/${verify_email_token}'>Click aqui para verifcar tu cuenta</a>
                </body>
            `
        }
    )

    return response.status(201).send({
        ok: true,
        status: 201,
        message: "User register successfully"
    })
}


/*
Crear la función login(request, response)
Esta función debe primero verificar que por body llegue un email y una password
Debe verificar que el email tenga formato de email
Debe buscar por email al usuario y verificar que este exista (sino decir 400 usario no encontrado)
Comparar el hash guardado en DB contra la contraseña que nos envio por body el cliente
    - Si es incorrecto decir (404 credenciales incorrectas)
    - Si es correcto decir (200 usuario autentificado exitosamente)

Este controlador debe estar en el endpoint 
POST /api/auth/login
*/

export async function login(request, response) {
    const { email, password } = request.body;
    if (
         !email || !password || typeof email !== "string" || typeof password !== "string"
    ) {
        throw new ServerError(
            "Email and password are required",
            400
        );
    }
    const normalizedEmail = email.trim().toLowerCase(); // .trim() funciona sobre string y elimina espacios al inicio y al final. .toLowerCase() Convierte todo el texto a minúsculas.
    if (!normalizedEmail || !password.trim()) {
        throw new ServerError(
            " email and password are required",
            400
        );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) { 
        throw new ServerError(
            "Email is incorrect",
            400
        );
    }

    const user = await user_repository.getByEmail(normalizedEmail); //Busca por email al usuario y verificar que este exista.
    if (!user) {
        throw new ServerError(
            "Invalid email or password",
            401
        );
    }
    const isPasswordValid = await compareHash(password, user.password); //Compara el hash guardado en DB contra la contraseña que nos envió por body el cliente.
    if (!isPasswordValid) {
        throw new ServerError(
            "Invalid email or password",
            401
        );
    }

    if(!user.email_verificado){
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

    return response.status(200).send({
        ok: true,
        message: "You have logged in successfully",
        status:200,
        data:{
            auth_token
        }
    });
}

export async function verifyEmail (request, response){
    const {verify_email_token} = request.params

    //verificar el token
    const {email} = jwt.verify(verify_email_token, ENVIRONMENT.JWT_SECRET_KEY)

    const user_found = await user_repository.getByEmail(email)

    if(!user_found){
        throw new ServerError('Usuario no encontrado', 404)
    }

    if(!user_found.activo){
        throw new ServerError('Usuario desactivado. Contactate con soporte si consideras que es un error')
    }

    if(user_found.email_verificado){
        throw new ServerError('Ya estas verificado', 400)
    }

    await user_repository.updateById(
        user_found._id,
        {
            email_verificado:true
        }
    )

    return response.status(200).send(
        {
            ok:true,
            status: 200,
            message: 'Usuario verificado exitosamente'
        }
    )
}