import { useContext } from "react";
import { ChannelContext } from "../../Context/ChannelContext";

export default function Messages() {
    const {messages_response, messages_error, messages_loading} = useContext(ChannelContext)

     if(messages_loading){
        return <span>Cargando...</span>
    }
    else if (messages_error) {
        return <span>ERROR: {messages_error}</span>
    }
    else if (!messages_response) {
        return <span>Todavía no hay mensajes en este canal</span>
    }
    else{
        return <div>
            {messages_response.data.messages.map(function(message){
                return(
                    <div key={message._id}>
                        <p>{message.contenido}</p>
                    </div>
                )
            })}
        </div>
    } 
}