import { useContext } from "react";
import { ChannelContext } from "../../Context/ChannelContext";
import Messages from "../ChannelMessages/Messages.jsx";  
import MessageInput from "../MessageInput/MessageInput.jsx";
import "./Channel.css"

export default function Channel(){
    const {channel_response, channel_error, channel_loading} = useContext(ChannelContext)

    if(channel_loading){
        return <span className="channel channel--status">Cargando...</span>
    }
    else if (channel_error) {
        return <span className="channel channel--status">ERROR: {channel_error}</span>
    }
    else if (!channel_response) {
        return <span className="channel channel--status">No se pudo obtener el canal</span>
    }
    return <div className="channel">
        <h2>{channel_response.data.channel_selected.nombre}</h2>
        <Messages/>
        <MessageInput/>
    </div> 
        
}