/*Interacción con la API */

const API_URL = import.meta.env.VITE_APP_URL_BACKEND

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