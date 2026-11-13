/*Interacción con la API */

const API_URL = import.meta.env.VITE_APP_URL_BACKEND

export async function verifyEmail(verification_token) {
    const response_http = await fetch(
        `${API_URL}/api/auth/verify-email?verification_token=${verification_token}`,
        {
            method: 'GET'
        }
    )
    const response_body = await response_http.json()

    if (!response_body.ok) {
        throw new Error(response_body.message)
    }
    return response_body
}
export async function resendEmailVerification(email) {
    const response_http = await fetch(
        `${API_URL}/api/auth/verify-email/${encodeURIComponent(email)}/resend`,
        {
            method: 'GET'
        }
    )
    const response_body = await response_http.json()

    if (!response_body.ok) {
        throw new Error(response_body.message)
    }
    return response_body
}

export async function forgotPassword(email) {
    const response_http = await fetch(
        API_URL + '/api/auth/forgot-password',
        {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        }
    )
    const response_body = await response_http.json()

    if (!response_body.ok) {
        throw new Error(response_body.message)
    }
    return response_body
}

export async function resetPassword(reset_token, password) {
    const response_http = await fetch(
        API_URL + '/api/auth/reset-password',
        {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                reset_token: reset_token,
                password: password
            })
        }
    )
    const response_body = await response_http.json()

    if (!response_body.ok) {
        throw new Error(response_body.message)
    }
    return response_body
}

export async function login(email, password) {

    const response_http = await fetch(
        API_URL + '/api/auth/login',
        {
            method: 'POST',
            headers: {
                // Le decimos al servidor qué tipo de dato estamos enviando
                'Content-Type': "application/json"
            },
            // JSON.stringify sirve para transformar un Objeto de JS en un JSON
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    )
    //Leemos el cuerpo de la respuesta como un JSON
    const response_body = await response_http.json()

    if (!response_body.ok) {
        throw new Error(response_body.message)
    }
    return response_body
}

export async function register(username, email, password) {
    const response_http = await fetch(
        API_URL + '/api/auth/register',
        {
            method: 'POST',
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        }
    )
    const response_body = await response_http.json()

    if (!response_body.ok) {
        throw new Error(response_body.message)
    }
    return response_body
}