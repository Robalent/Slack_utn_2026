/*
Controllers de workspaces.
Los controllers no contienen lógica de negocio: se encargan de
extraer los datos de la request (body, params, user del authMiddleware,
workspace del workspaceMiddleware), delegar en la capa de servicios
y armar la respuesta HTTP.

La lógica de negocio vive en ../services/workspace.services.js
*/
import * as workspace_service from '../services/workspace.services.js'


export async function createWorkspace(request, response) {
    console.log('[CREATE WORKSPACE]', request.user)

    const { name, description } = request.body

    const { workspace_created, owner_membership } = await workspace_service.createWorkspace({
        user_id: request.user.id,
        name,
        description
    })

    return response.status(201).send(
        {
            ok: true,
            status: 201,
            message: 'Por ahora todo bien',
            data: {
                workspace_created,
                owner_membership
            }
        }
    )
}


export async function getWorkspaceById(request, response) {
    return response.status(200).send({
        ok: true,
        message: "Workspace obtenido correctamente",
        status: 200,
        data: {
            workspace_selected: request.workspace
        }
    })
}


export async function deleteWorkspace(request, response) {
    const workspace_deleted = await workspace_service.deleteWorkspace({
        workspace: request.workspace
    })

    return response.status(200).send({
        ok: true,
        message: 'Workspace eliminado correctamente',
        status: 200,
        data: {
            workspace_deleted
        }
    })
}


export async function getWorkspaces(request, response) {
    const workspaces = await workspace_service.getWorkspacesByUser({
        user_id: request.user.id
    })

    return response.status(200).send({
        ok: true,
        message: 'Workspaces obtenidos correctamente',
        status: 200,
        data: workspaces
    })
}


export async function updateWorkspace(request, response) {
    const { name, description } = request.body

    const workspace_updated = await workspace_service.updateWorkspace({
        workspace: request.workspace,
        name,
        description
    })

    return response.status(200).send({
        ok: true,
        message: 'Workspace actualizado correctamente',
        status: 200,
        data: {
            workspace_updated
        }
    })
}
