import DirectMessage from "../models/directMessage.model.js";


class DirectMessageRepository{
    async create(content, user_id){
        return DirectMessage.create({
            contenido: content,
            fk_id_receptor: user_id,
            fk_id_emisor: user_id
        })
    }

    async deleteById(directMessage_id){
        const result = await DirectMessage.findByIdAndDelete(directMessage_id)
        return result
    }

    async updateById(directMessage_id,{content}){
        const result = await DirectMessage.findByIdAndUpdate(directMessage_id, {contenido: content})
        return result
    }

    async getAllMessagesBySearchTerm(search_term){
        const result = await DirectMessage.find({
            nombre:{
                $regex: search_term,
                $options: 'i'
            }
        })// REVISAR ESTE MÉTODO 
        return result
    }

    async getAllMessagesByDateRange(min_date, max_date){
        const result = await DirectMessage.find({
            fecha_creacion:{
                $gte: new Date(min_date),
                $lte: new Date(max_date)
            }
        })
        return result
    }
}

const directmessage_repository = new DirectMessageRepository()
export default directmessage_repository