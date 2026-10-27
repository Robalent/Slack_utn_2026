import Channel from "../models/channel.model.js";

class ChannelRepository {
    async create (name, workspace_id, description){
        return Channel.create({
            nombre: name, 
            fk_id_espacio_trabajo: workspace_id,
            descripcion: description
        })
    }

    async deleteById(channel_id){
        const result = await Channel.findByIdAndDelete(channel_id)
        return result
    }

    async updateById(channel_id,{name, description}){
        const result = await Channel.findByIdAndUpdate(channel_id, {nombre: name, descripcion: description})
        return result
    }

    async getAllChannelsByWorkspaceId(workspace_id){
        const result = await Channel
        .find({fk_id_espacio_trabajo: workspace_id})
        // .populate('fk_id_espacio_trabajo') //CHEQUEAR POPULATE
        return result
    }
}

const channel_repository = new ChannelRepository()
export default channel_repository