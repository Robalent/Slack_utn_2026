import mongoose from "mongoose"


const userSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        fecha_creacion: {
            type: Date,
            default: Date.now
        },
        activo: {
            type: Boolean,
            default: true
        },
        email_verificado: {
            type: Boolean,
            default: false
        }
    }
)

export const USER_COLECTION_NAME = 'Usuario'
const User = mongoose.model(USER_COLECTION_NAME, userSchema)

export default User