/*
Un repository es donde manejamos la comunicación con nuestros datos (generalmente la BDD)
*/

import User from "../models/user.model.js"

class UserRepository {
    async create(nombre, email, password) {
        await User.create({ nombre: nombre, email: email, password:password}) //activo y fecha_creacion vienen por defecto
    }

    async get() {
        const result = await User.find()
        return result
    }

    async getByCreationDate(min_date, max_date) {
        const result = await User.find({
            fecha_creacion: {
                $gte: new Date(min_date), // $gte establece una fecha mínima
                $lte: new Date(max_date) // $lt establece una fecha máxima 
            }
        })
        console.log(result)
        return result
    }

    async getByName(name) {
        const result = await User.find({
            nombre: name,
            activo: true
        })
        return result
    }

    async getBySearchTerm(term) {
        const result = await User.find({
            nombre: {
                $regex: term,
                $options: 'i' //para que no sea case sensitive
            },
            activo: true
        })
        .limit(5)
        return result
    }

    async getById(user_id) {
        const result = await User.findById(user_id)
        return result
    }

    async getByEmail(email) {
        // te devuelve null (si no encuentra) o un objeto con el resultado
        const result = await User.findOne({ email: email })
        return result
    }

    async deleteById(user_id) {
        const result = await User.findByIdAndDelete(user_id)
        return result
    }

    async softDeleteById(user_id) {
        const result = await User.findByIdAndUpdate(user_id, { activo: false })
        return result
    }

    // actualizamos al usuario para verificarlo
    async updateById (user_id, update_data){
        return await User.findByIdAndUpdate(
            user_id,
            update_data
        )
    }
}

const user_repository = new UserRepository()
export default user_repository