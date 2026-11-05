import { Link } from "react-router"
import useRequest from "../../hooks/useRequest"
import { getAllWorkspaces } from "../../services/workspaceService"

export default function WorkspaceList (){
    const {workspaces_response, workspaces_error, workspaces_loading, reloadWorkspaces} = useWorkspacesList()

useEffect(
        () => {
            sendRequest(
                () => getAllWorkspaces()
            )
        },
        []
    )

    function reloadWorkspaces(){
        sendRequest(
            () => getAllWorkspaces()
        )
    }

    if (workspaces_loading) {
        return<span>Cargando...</span>
    }
    else if (workspaces_error) {
       return <div>
           <span>ERROR: {workspaces_error}</span>
           <button onClick={reloadWorkspaces}>Recargar</button>
       </div>
    }
    else if (!workspaces_response) {
        return <div>
            <span>Error: Ocurrió un problema al obtener la lista de Workspaces</span>
            <button onClick={reloadWorkspaces}>Recargar</button>
        </div>
            
    }
    else if (workspaces_response && workspaces_response.data.length === 0) {
        return <p>Aún no creaste ningún Workspace</p>
    }
    else{
        return <div>
            {workspaces_response.data.map((workspace) => (
                <Link key={workspace.id} to={`/workspace/${workspace._id}`}> 
                {workspace.nombre}
                </Link>
            ))}
        </div>
    }
}