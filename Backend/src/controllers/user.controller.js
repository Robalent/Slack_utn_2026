import user_repository from "../repositories/user.repository.js"
import ServerError from "../utils/error.util.js"

export async function getUsers(request, response) {
    //traemos de DB la lista completa de usuarios
    const user_list = await user_repository.get()

    return response.send({
        message: "Get users list",
        ok: true,
        status: 200,
        data: {
            users: user_list
        }
    })
}

export async function getUsersById(request, response) {
    console.log(request.params)

    //accedemos a los parametros de URL
    const user_id = request.params.user_id
    const user = await user_repository.getById(user_id)

    // si no existe el usuario devolver error 404
    if (!user) {
        throw new ServerError("User not found", 404)
    }
    return response.send({
        message: "Get user details successfully",
        ok: true,
        status: 200,
        data: {
            user: user
        }
    })
}