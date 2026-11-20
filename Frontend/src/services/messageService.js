const API_URL = import.meta.env.VITE_APP_URL_BACKEND

export async function getAllMessagesByChannelId(channel_id, workspace_id) {
    const auth_token = localStorage.getItem('auth_token')
    const response_http = await fetch(
        API_URL + '/api/workspaces/'+ workspace_id + '/channels/' + channel_id + '/messages',
        {
            method: 'GET',
            headers:{
                'Authorization': `bearer ${auth_token}`
            }
        }
    )
    const response_body = await response_http.json()

    if(!response_body.ok){
        throw new Error(response_body.message)
    }
    return response_body
}

export async function createMessages(channel_id, workspace_id, content) {
    const auth_token = localStorage.getItem('auth_token')
    const response_http = await fetch(
        API_URL + '/api/workspaces/'+ workspace_id + '/channels/' + channel_id + '/messages',
        {
            method: 'POST',
            headers:{
                'Authorization': `bearer ${auth_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content})
        }
    )
    const response_body = await response_http.json()

    if(!response_body.ok){
        throw new Error(response_body.message)
    }
    return response_body
}