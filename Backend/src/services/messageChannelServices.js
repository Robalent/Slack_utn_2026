import messagechannel_repository from "../repositories/messageChannel.repository.js";
import ServerError from "../utils/error.util.js";

export async function getAllMessagesByChannelId({channel_id}) {
    const messages = await messagechannel_repository.getAllMessagesByChannelId(channel_id)

    return messages
}

export async function createMessages({content, user_id, channel_id}) {
    if (!content) {
        throw new ServerError('El mensaje debe tener contenido', 400)
    }
    
    const create_message = await messagechannel_repository.create(content, user_id, channel_id)

    return create_message
}
