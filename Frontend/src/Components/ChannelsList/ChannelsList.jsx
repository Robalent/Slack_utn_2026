import { useContext } from "react";
import { WorkspaceContext } from "../../Context/WorkspaceContext";
import { Link, useParams } from "react-router";
import "./ChannelsList.css"

export default function ChannelsList(){
    const {channels_response, channels_error, channels_loading, reloadChannels} = useContext(WorkspaceContext)
    const {workspace_id} = useParams()

    if (channels_loading) {
        return <span className="channels-list channels-list--status">Cargando...</span>
    }
    else if (channels_error) {
       return <div className="channels-list channels-list--error">
           <span>ERROR: {channels_error}</span>
           <button onClick={reloadChannels}>Recargar</button>
       </div>
    }
    else if (!channels_response) {
        return <div className="channels-list channels-list--error">
            <span>Error: Ocurrió un problema al obtener la lista de Channels</span>
            <button onClick={reloadChannels}>Recargar</button>
        </div>
            
    }
    else {
        return <div className="channels-list">
            <div className="channels-list__header">
                <h3>Canales</h3>
                <Link className="channels-list__create" to={`/workspace/${workspace_id}/newChannel`}>+</Link>
            </div>
            
            {channels_response.data.length ===0
            ?( <p>Aún no creaste ningún canal</p>)
            : (
                channels_response.data.map((channel) => (
                    <Link className="channels-list__link" key={channel._id} to={`/workspace/${workspace_id}/${channel._id}`}>
                        {channel.nombre}
                    </Link>
                )))
            }
            
        </div>
    }
    
}
