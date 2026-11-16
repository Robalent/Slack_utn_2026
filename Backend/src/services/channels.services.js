import mongoose from "mongoose"
import channel_repository from "../repositories/channel.repository.js"
import ServerError from "../utils/error.util.js"

export async function getAllChannelsByWorkspaceId({ workspace_id }) {
    const channels = await channel_repository.getAllChannelsByWorkspaceId(workspace_id)

    return channels
}

export async function createChannel({ name, workspace_id, description }) {
    if (!name || !name.trim()) {
        throw new ServerError('El nombre es un campo obligatorio', 400)
    }

    const channel_created = await channel_repository.create(name, workspace_id, description)

    return channel_created
}

export async function getChannelById({channel_id, workspace_id}) {
    if (!mongoose.isValidObjectId(channel_id)) {
        throw new ServerError('El ID del canal es incorrecto', 400)
    }

    const channel = await channel_repository.getById(channel_id)

    if (!channel) {
        throw new ServerError('No se ha encontrado el canal', 404)
    }

    if (channel.fk_id_espacio_trabajo.toString() !== workspace_id) {
        throw new ServerError('No se ha encontrado el canal', 404)
    }

    return channel
}