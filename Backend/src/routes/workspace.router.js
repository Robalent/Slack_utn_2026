/*
Routers de workspace.
Igual que en auth: el router solo declara endpoints y middlewares.
La lógica vive en el controller (HTTP) y en el service (negocio).
*/
import express from 'express'
import {
    createWorkspace,
    getWorkspaceById,
    deleteWorkspace,
    getWorkspaces,
    updateWorkspace
} from '../controllers/workspace.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import workspaceMiddleware from '../middlewares/workspace.middleware.js'

const workspaceRouter = express.Router()

// Crear un workspace (requiere estar autenticado)
workspaceRouter.post(
    '/',
    authMiddleware,
    createWorkspace
)
// Ejemplo: POST /api/workspaces  { name, description } + header Authorization

// Obtener un workspace por id (requiere ser miembro)
workspaceRouter.get(
    '/:workspace_id',
    authMiddleware,
    workspaceMiddleware([]),
    getWorkspaceById
)
// Ejemplo: GET /api/workspaces/:workspace_id + header Authorization

// Eliminar un workspace (requiere ser owner)
workspaceRouter.delete(
    '/:workspace_id',
    authMiddleware,
    workspaceMiddleware(['owner']),
    deleteWorkspace
)
// Ejemplo: DELETE /api/workspaces/:workspace_id + header Authorization

// Listar los workspaces del usuario autenticado (con su rol en cada uno)
workspaceRouter.get(
    '/',
    authMiddleware,
    getWorkspaces
)
// Ejemplo: GET /api/workspaces + header Authorization

// Actualizar un workspace (requiere ser owner o admin)
workspaceRouter.put(
    '/:workspace_id',
    authMiddleware,
    workspaceMiddleware(['owner', 'admin']),
    updateWorkspace
)
// Ejemplo: PUT /api/workspaces/:workspace_id  { name, description } + header Authorization

export default workspaceRouter