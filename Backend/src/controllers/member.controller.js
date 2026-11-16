import * as member_service from '../services/member.services.js'

export async function getAllMembershipsByWorkspaceId(request, response) {
    const { workspace_id } = request.params

    const members = await member_service.getAllMembershipsByWorkspaceId({ workspace_id })

    return response.send({
        ok: true,
        message: 'Miembros obtenidos correctamente',
        status: 200,
        data: members
    })
}