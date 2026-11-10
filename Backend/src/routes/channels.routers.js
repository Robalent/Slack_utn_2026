import express, { request } from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import workspaceMiddleware from '../middlewares/workspace.middleware.js'
import channel_repository from '../repositories/channel.repository.js'
import ServerError from '../utils/error.util.js'

const channelRouter = express.Router({mergeParams: true})

channelRouter.get(
    '/',
    authMiddleware,
    workspaceMiddleware([]),
    async (request, response) => {
        const {workspace_id} = request.params
        const channels = await channel_repository.getAllChannelsByWorkspaceId(workspace_id)
        return response.send({
            ok: true,
            message: 'Canales obtenidos correctamente',
            status:200,
            data: channels
        })
    }
)

channelRouter.post(
    '/',
    authMiddleware,
    workspaceMiddleware([]),
    async (request, response) =>{
        const {workspace_id} = request.params
        const {name, description} = request.body

        if(!name){
            throw new ServerError('El nombre es un campo obligatorio', 400)
        }

        const channel_created= await channel_repository.create(name, workspace_id, description)

        return response.status(201).send({
            ok: true,
            status: 201,
            message: 'Canal creado correctamente',
            data:{
                channel_created
            }
        })
    }
)

export default channelRouter

/*
*/