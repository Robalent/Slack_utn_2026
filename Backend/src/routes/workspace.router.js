import express, { request } from 'express'
import workspace_repository from '../repositories/workspace.repository.js'
import member_repository from '../repositories/member.repository.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import workspaceMiddleware from '../middlewares/workspace.middleware.js'
import ServerError from '../utils/error.util.js'

const workspaceRouter = express.Router()

workspaceRouter.post(
    '/', //controlador
    authMiddleware,
    async (request, response)=>{
    // quién quiere hacer esta operación?
    console.log('[CREATE WORKSPACE]', request.user)
    const {name, description} = request.body

    // Crear el espacio de trabajo 
    // Crear la membresia a nombre del usuario creador con rol de owner 

    const workspace_created= await workspace_repository.create(name, description)
    const owner_membership = await member_repository.create(
        request.user.id,
        workspace_created._id,
        'owner'
    )

    return response.status(201).send(
        {
            ok:true,
            status:201,
            message: 'Por ahora todo bien',
            data: {
                workspace_created,
                owner_membership
            }
        }
    )
})

workspaceRouter.get(
    '/:workspace_id', 
    authMiddleware,
    workspaceMiddleware([]),
    async (request, response) => {
        
        return response.status(200).send({
            ok: true,
            message: "Workspace obtenido correctamente",
            status: 200,
            data: {
                workspace_selected: request.workspace
            }
        })
    }
)

workspaceRouter.delete(
    '/:workspace_id',
    authMiddleware,
    workspaceMiddleware(['owner']),
    async (request, response) =>{
        await workspace_repository.deleteById(request.workspace._id)
        await member_repository.deleteAllMembershipsByWorkspaceId(request.workspace_id)
        return response.status(200).send({
            ok: true, 
            message: 'Workspace eliminado correctamente',
            status: 200, 
            data: {
                workspace_deleted: request.workspace
            }
        })
    }
)

workspaceRouter.get(
    '/',
    authMiddleware,
    async(request, response) => {

        const workspaces = await member_repository.getAllWorkspaceByUserId(request.user.id)

        return response.status(200).send({
            ok:true,
            message: 'Workspaces obtenidos correctamente',
            status: 200,
            data: workspaces
        })
    }
    
)

workspaceRouter.put(
    '/:workspace_id',
    authMiddleware,
    workspaceMiddleware(['owner', 'admin']),
    async (request, response) => {
        const {workspace_id} = request.params
        const {name, description} = request.body

        if (!name || !description) {
            throw new ServerError('name y description son campos obligatorios', 400)
        }

        const workspace_updated = await workspace_repository.updateById(workspace_id,{nombre: name, description: descripcion})
        return response.status(200).send({
            ok:true,
            message: 'Workspace actualizado correctamente',
            status:200,
            data:{
                workspace_updated
            }
        })
    }
)

export default workspaceRouter