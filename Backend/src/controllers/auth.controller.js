/*
Controllers de auth.
Los controllers no contienen lógica de negocio: se encargan de
extraer los datos de la request (body, params, query), delegar en la
capa de servicios y armar la respuesta HTTP.

La lógica de negocio vive en ../services/auth.services.js
*/
import * as auth_service from "../services/auth.services.js"


export async function register(request, response) {
    console.log("[REGISTER]", request.body)

    const { username, email, password } = request.body

    await auth_service.registerUser({ username, email, password })

    return response.status(201).send({
        ok: true,
        status: 201,
        message: "User register successfully"
    })
}


export async function login(request, response) {
    const { email, password } = request.body

    const { auth_token } = await auth_service.loginUser({ email, password })

    return response.status(200).send({
        ok: true,
        message: "You have logged in successfully",
        status: 200,
        data: {
            auth_token
        }
    })
}


export async function verifyEmail(request, response) {
    const { verification_token } = request.query

    await auth_service.verifyUserEmail({ verification_token })

    return response.status(200).send(
        {
            ok: true,
            status: 200,
            message: 'Usuario verificado exitosamente'
        }
    )
}


export async function resendVerificationEmail(request, response) {
    const { email } = request.params

    await auth_service.resendUserVerificationEmail({ email })

    return response.status(200).send(
        {
            ok: true,
            status: 200,
            message: 'Email de verificación enviado. Revisá tu casilla de correo'
        }
    )
}


export async function forgotPassword(request, response) {
    const { email } = request.body

    await auth_service.forgotPassword({ email })

    // Mensaje genérico: no revelamos si el email está registrado o no
    return response.status(200).send(
        {
            ok: true,
            status: 200,
            message: 'Si el email está registrado, vas a recibir un mail con los pasos para restablecer tu contraseña'
        }
    )
}


export async function resetPassword(request, response) {
    const { reset_token, password } = request.body

    await auth_service.resetPassword({ reset_token, password })

    return response.status(200).send(
        {
            ok: true,
            status: 200,
            message: 'Contraseña restablecida exitosamente'
        }
    )
}
