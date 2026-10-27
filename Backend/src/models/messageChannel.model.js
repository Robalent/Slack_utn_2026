import mongoose, { mongo } from "mongoose";
import { USER_COLECTION_NAME } from "./user.model";
import { CHANNEL_COLLECTION_NAME } from "./channel.model";

const messageChannelSchema = new mongoose.Schema(
    {
        contenido:{
            type: String,
            maxlength: 5000
        },
        fk_id_emisor:{
            type: mongoose.Schema.Types.ObjectId,
            required: true, 
            ref: USER_COLECTION_NAME
        },
        fk_id_canal:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: CHANNEL_COLLECTION_NAME
        },
        fecha_creacion:{
            type: Date,
            default: Date.now
        }
    }
)

export const MESSAGECHANNEL_COLLECTION_NAME = "MensajeCanal"
const MessageChannel = mongoose.model(MESSAGECHANNEL_COLLECTION_NAME, messageChannelSchema)
export default MessageChannel