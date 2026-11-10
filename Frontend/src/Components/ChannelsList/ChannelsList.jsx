import { useContext } from "react";
import { WorkspaceContext } from "../../Context/WorkspaceContext";

export default function ChannelsList(){
    const {channels_response, channels_error, channels_loading, reloadChannels} = useContext(WorkspaceContext)

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
    else if (channels_response && channels_response.data.length === 0) {
        return <p>Aún no creaste ningún Channel</p>
    }
    else {
        return <div>
            {channels_response.data.map((channel) => (
                <div key={channel._id}>
                    {channel.nombre}
                </div>
            ))}
        </div>
    }
}
