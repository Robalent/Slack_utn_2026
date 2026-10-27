import mongoose from "mongoose";
import {WORKSPACE_COLLECTION_NAME} from './workspace.models.js'
import {USER_COLECTION_NAME} from './user.model.js'


const memberSchema = new mongoose.Schema(
    {
        fk_id_usuario:{
            // este es el tipo de dato del id
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: USER_COLECTION_NAME /*La coleccion a la que hacemos referencia */
        },
        fk_id_espacio_trabajo:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: WORKSPACE_COLLECTION_NAME,
        },
        rol:{
            type: String,
            enum:['user', 'admin', 'owner'],
            default: 'user'
        },
        fecha_creacion:{
            type: Date,
            default: Date.now
        }
    }
)


export const MEMBER_COLLECTION_NAME = 'Miembro'
const Member = mongoose.model(MEMBER_COLLECTION_NAME, memberSchema)
export default Member
