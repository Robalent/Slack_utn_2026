import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema (
    {
        nombre:{
            type: String,
            required: true,
            maxlength: 30,
            trim: true
        },
        descripcion:{
            type:String,
            maxlength: 500
        },
        fecha_creacion:{
            type: Date,
            default: Date.now
        }
    }
)


export const WORKSPACE_COLLECTION_NAME = 'EspacioTrabajo'
const Workspace = mongoose.model( WORKSPACE_COLLECTION_NAME, workspaceSchema)

export default Workspace
