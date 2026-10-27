import MessageChannel from "../models/messageChannel.model.js"

class MessageChannelRepository {
    async create (content, user_id, channel_id){
        return MessageChannel.create({
            contenido: content,
            fk_id_emisor: user_id,
            fk_id_canal: channel_id
        })
    }

    async deleteById (messageChanel_id){
        const result = await MessageChannel.findByIdAndDelete(messageChanel_id)
        return result
    }

    async updatebyId(messageChanel_id, {content}){
        const result = await MessageChannel.findByIdAndUpdate(messageChanel_id,{contenido: content})
        return result
    }

    async getAllMessagesByChannelId (channel_id){
        const result = await MessageChannel.findById(channel_id)
        return result
    }

    async gelAllMessagesBySearchTerm(search_term){
        const result = await MessageChannel.find({
            nombre :{
                $regex: search_term,
                $options: 'i'
            }
        }) // REVISAR ESTE MÉTODO 
        return result
    }

    async getAllMessagesByDateRange(min_date, max_date){
        const result = await MessageChannel.find({
            fecha_creacion:{
                $gte: new Date(min_date),
                $lte: new Date(max_date)
            }
        })
        return result
    }

    async getAllMessagesByMemberId(member_id){
        const result = await MessageChannel.find({
            fk_id_emisor: member_id
        })
        return result
    }
} 

const messagechannel_repository = new MessageChannelRepository
export default messagechannel_repository