import mongoose, { mongo } from "mongoose";
import { USER_COLECTION_NAME } from "./user.model";

const directMessageSchema = new mongoose.Schema (
    {
        contenido:{
            type: String,
            maxlength: 5000
        },
        fk_id_receptor:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: USER_COLECTION_NAME
        },
        fk_id_emisor:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: USER_COLECTION_NAME
        },
        fecha_creacion:{
            type: Date,
            deffault: Date.now
        }
    }
)

export const DIRECTMESSAGE_COLLECTION_NAME = "MensajeDirecto"
const DirectMessage = mongoose.modelI(DIRECTMESSAGE_COLLECTION_NAME, directMessageSchema)
export default DirectMessage