import member_repository from "../repositories/member.repository.js"
import workspace_repository from "../repositories/workspace.repository.js"
import ServerError from "../utils/error.util.js"

function workspaceMiddleware(valid_roles) {
    return async function (request, response, next) {
        const { workspace_id } = request.params
        const workspace_selected = await workspace_repository.getById(workspace_id)

        const membership = await member_repository.getMembershipByUserAndWorkspace(request.user.id, workspace_id)
        console.log('[WorkspaceMiddleware]:', membership, workspace_id, request.user)

        if (!workspace_selected) {
            throw new ServerError('Workspace no encontrado', 404)
        }
        
        if (!membership) {
            throw new ServerError('No eres miembro de este workspace', 403)
        }

        if (valid_roles.length > 0 && !valid_roles.includes(membership.rol)) {
            throw new ServerError('No tenes permisos suficientes para hcer esta operación', 403)
        }
        request.workspace = workspace_selected
        next()
    }
}

export default workspaceMiddleware