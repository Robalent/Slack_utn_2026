/*
Capa de servicios de workspaces.
Acá vive la lógica de negocio de cada endpoint de workspace:
reglas, acceso al repository y efectos.
Los controllers solo extraen datos de la request, llaman al servicio
y arman la respuesta HTTP.
*/
import workspace_repository from '../repositories/workspace.repository.js'
import member_repository from '../repositories/member.repository.js'
import ServerError from '../utils/error.util.js'
import channel_repository from '../repositories/channel.repository.js'
import messagechannel_repository from '../repositories/messageChannel.repository.js'


/*
Crear un workspace:
- crea el espacio de trabajo
- crea la membresía del usuario creador con rol 'owner'
*/
export async function createWorkspace({ user_id, name, description }) {
    const workspace_created = await workspace_repository.create(name, description)

    const owner_membership = await member_repository.create(
        user_id,
        workspace_created._id,
        'owner'
    )

    return { workspace_created, owner_membership }
}


/*
Listar los workspaces a los que pertenece un usuario (con su rol en cada uno)
y, para cada workspace, la lista de sus miembros con nombre y rol.
*/
export async function getWorkspacesByUser({ user_id }) {
    // Las membresías del usuario nos dicen a qué workspaces pertenece y con qué rol
    const memberships = await member_repository.getAllWorkspaceByUserId(user_id)

    // Traer los miembros de todos esos workspaces en una sola consulta
    const workspace_ids = memberships.map(
        membership => membership.fk_id_espacio_trabajo._id
    )
    const all_memberships = await member_repository.getAllMembershipsByWorkspaceIds(workspace_ids)

    // Agrupar los miembros (nombre y rol) por workspace
    const members_by_workspace = {}
    for (const membership of all_memberships) {
        const workspace_id = membership.fk_id_espacio_trabajo._id.toString()
        if (!members_by_workspace[workspace_id]) {
            members_by_workspace[workspace_id] = []
        }
        members_by_workspace[workspace_id].push({
            nombre: membership.fk_id_usuario.nombre,
            rol: membership.rol
        })
    }

    return memberships.map(membership => {
        const workspace_id = membership.fk_id_espacio_trabajo._id.toString()
        return {
            member_id: membership._id,
            member_rol: membership.rol,
            workspace_id: membership.fk_id_espacio_trabajo._id,
            workspace_nombre: membership.fk_id_espacio_trabajo.nombre,
            workspace_fecha_creacion: membership.fk_id_espacio_trabajo.fecha_creacion,
            miembros: members_by_workspace[workspace_id] || []
        }
    })
}


/*
Eliminar un workspace y todas sus membresías.
El workspace ya viene validado por el workspaceMiddleware (existe y
el usuario tiene rol owner) y llega en request.workspace.
*/
export async function deleteWorkspace({ workspace }) {
    const channels = await channel_repository.getAllChannelsByWorkspaceId(workspace._id)
     
    for (const channel of channels) {
        await messagechannel_repository.deleteAllMessagesByChannelId(channel._id)
    }
    await channel_repository.deleteAllChannelsByWorkspaceId(workspace._id)
    await member_repository.deleteAllMembershipsByWorkspaceId(workspace._id)
    await workspace_repository.deleteById(workspace._id)
    

    return workspace
}


/*
Actualizar un workspace:
- valida que lleguen name y description
- el workspace ya viene validado por el workspaceMiddleware
  (existe y el usuario tiene rol owner o admin)
*/
export async function updateWorkspace({ workspace, name, description }) {
    if (!name || !description) {
        throw new ServerError('name y description son campos obligatorios', 400)
    }

    const workspace_updated = await workspace_repository.updateById(
        workspace._id,
        { nombre: name, descripcion: description }
    )

    return workspace_updated
}
