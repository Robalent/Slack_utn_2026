import { useParams } from "react-router"
import { WorkspaceContext } from "../../Context/WorkspaceContext"
import { useContext } from "react"

export default function WorkspaceById(){
    const {workspace_id} = useParams()
    const {workspace_response, workspace_error, workspace_loading} = useContext(WorkspaceContext)

    if (workspace_loading) {
        return<span>Cargando...</span>
    }
    else if(workspace_error){
        return <span>ERROR: {workspace_error}</span>
    }
    else if (!workspace_response){
        return <span>No se pudo obtener el workspace</span>
    }
    return <h2>{workspace_response.data.workspace_selected.nombre}</h2>
}