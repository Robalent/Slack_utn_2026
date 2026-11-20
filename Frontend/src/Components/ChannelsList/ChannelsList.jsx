import { useContext } from "react";
import { WorkspaceContext } from "../../Context/WorkspaceContext";
import { Link, useParams } from "react-router";

export default function ChannelsList(){
    const {channels_response, channels_error, channels_loading, reloadChannels} = useContext(WorkspaceContext)
    const {workspace_id} = useParams()

    if (channels_loading) {
        return<span>Cargando...</span>
    }
    else if (channels_error) {
       return <div>
           <span>ERROR: {channels_error}</span>
           <button onClick={reloadChannels}>Recargar</button>
       </div>
    }
    else if (!channels_response) {
        return <div>
            <span>Error: Ocurrió un problema al obtener la lista de Channels</span>
            <button onClick={reloadChannels}>Recargar</button>
        </div>
            
    }
    else {
        return <div>
            <Link to={`/workspace/${workspace_id}/newChannel`}>+ Crear un nuevo canal</Link>
            
            {channels_response.data.length ===0
            ?( <p>Aún no creaste ningún canal</p>)
            : (
                channels_response.data.map((channel) => (
                    <Link key={channel._id} to={`/workspace/${workspace_id}/${channel._id}`}>
                        {channel.nombre}
                    </Link>
                )))
            }
            
        </div>
    }
    
}
