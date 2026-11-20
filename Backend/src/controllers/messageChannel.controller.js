import * as messagechannel_service from '../services/messageChannelServices.js'

export async function getAllMessagesByChannelId(request, response) {
    const {workspace_id, channel_id} = request.params

    const messages = await messagechannel_service.getAllMessagesByChannelId({channel_id})

    return response.send({
        ok: true,
        message: 'Mensajes obtenidos correctamente', 
        status: 200,
        data:{
            messages
        }
    })
}

export async function createMessages(request, response){
    const {channel_id} = request.params
    const user_id = request.user.id
    const {content} = request.body

    const message_created = await messagechannel_service.createMessages({content, user_id, channel_id})

    return response.send({
        ok: true,
        message: 'Mensaje creado correctamente',
        status:201,
        data:{
            message_created
        }
    })
}

