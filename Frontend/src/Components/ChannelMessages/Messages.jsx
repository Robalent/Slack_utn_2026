import { useContext } from "react";
import { ChannelContext } from "../../Context/ChannelContext";
import "./Messages.css"

export default function Messages() {
    const {messages_response, messages_error, messages_loading} = useContext(ChannelContext)

     if(messages_loading){
        return <span className="messages messages--status">Cargando...</span>
    }
    else if (messages_error) {
        return <span className="messages messages--status">ERROR: {messages_error}</span>
    }
    else if (!messages_response) {
        return <span className="messages messages--status">Todavía no hay mensajes en este canal</span>
    }
    else{
        return <div className="messages">
            {messages_response.data.messages.map(function(message){
                return(
                    <div className="messages__item" key={message._id}>
                        <p className="messages__text">{message.contenido}</p>
                    </div>
                )
            })}
        </div>
    } 
}