const API_URL = 'http://127.0.0.1:8080'

export async function getAllWorkspaces(){
    const auth_token = localStorage.getItem('auth_token')
    const response_http = await fetch(
        API_URL + '/api/workspaces',
        {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${auth_token}`
            }
        }

    )
    //Leemos el cuerpo de la respuesta como un JSON
    const response_body = await response_http.json()

    if (!response_body.ok) {
        throw new Error(response_body.message)
    }
    return response_body
}