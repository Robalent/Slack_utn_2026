import { Link, useNavigate, useParams } from "react-router"
import { WorkspaceContext } from "../../Context/WorkspaceContext"
import { useContext } from "react"
import useRequest from "../../hooks/useRequest"
import { deleteWorkspace } from "../../services/workspaceService.js"

export default function WorkspaceById() {
    const { workspace_id } = useParams()
    const { workspace_response, workspace_error, workspace_loading } = useContext(WorkspaceContext)
    const navigate = useNavigate()
    const { error, loading, sendRequest } = useRequest()

    async function handleDelete() {
        const deleted_workspace = window.confirm('¿Estás seguro de que querés eliminar este workspace?')
        if (deleted_workspace === true) {
            const response = await sendRequest(
                () => deleteWorkspace(workspace_id)
            )
            if (response && response.ok) {
                navigate(`/home`)
            }
        }

    }

    if (workspace_loading) {
        return <span>Cargando...</span>
    }
    else if (workspace_error) {
        return <span>ERROR: {workspace_error}</span>
    }
    else if (!workspace_response) {
        return <span>No se pudo obtener el workspace</span>
    }
    return (
        <div>
            <h2>{workspace_response.data.workspace_selected.nombre}</h2>

            <Link to={`/workspace/${workspace_id}/edit`}>Editar Workspace</Link>
            <button onClick={handleDelete}>Eliminar Workspace</button>
        </div>
    )
}