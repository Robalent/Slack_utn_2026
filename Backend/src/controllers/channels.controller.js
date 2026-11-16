import * as channel_service from '../services/channels.services.js'


export async function getAllChannelsByWorkspaceId(request, response) {
    const { workspace_id } = request.params

    const channels = await channel_service.getAllChannelsByWorkspaceId({workspace_id})

    return response.send({
        ok: true,
        message: 'Canales obtenidos correctamente',
        status: 200,
        data: channels
    })
}

export async function createChannel(request, response) {
    const { workspace_id } = request.params
    const { name, description } = request.body

    const channel_created= await channel_service.createChannel({name, workspace_id, description})

    return response.status(201).send({
        ok: true,
        status: 201,
        message: 'Canal creado correctamente',
        data: {
            channel_created
        }
    })
}

export async function getChannelById(request, response) {
    const {workspace_id, channel_id} = request.params

    const channel_selected = await channel_service.getChannelById({channel_id, workspace_id})

    return response.status(200).send({
        ok: true,
        status:200,
        message: 'Canal obtenido correctamente',
        data:{
            channel_selected
        }
    })
}