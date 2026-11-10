import express from 'express'
import authMiddleware from "../middlewares/auth.middleware.js"
import workspaceMiddleware from "../middlewares/workspace.middleware.js"
import member_repository from "../repositories/member.repository.js"

const memberRouter = express.Router({mergeParams: true})

memberRouter.get(
    '/',
    authMiddleware,
    workspaceMiddleware([]),
    async (request, response) =>{
        const {workspace_id} = request.params
        const members = await member_repository.getAllMembershipsByWorkspaceId(workspace_id)

        return response.send ({
            ok: true, 
            message: 'Miembros obtenidos correctamente',
            status:200,
            data: members
        })
    }
)

export default memberRouter