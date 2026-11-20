import { useContext, useState } from "react";
import { ChannelContext } from "../../Context/ChannelContext";
import { createMessages } from "../../services/messageService.js";
import { useParams } from "react-router";

export default function MessageInput() {
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const { reloadMessages } = useContext(ChannelContext)
    const { channel_id, workspace_id } = useParams()

    async function handleSubmit(event) {
        event.preventDefault()

        if (content.trim() === "") {
            setError("No se pueden enviar mensajes vacíos")
            return
        }

        try {
            await createMessages(channel_id, workspace_id, content)
            setError("")
            setContent("")
            reloadMessages()
        } catch (error) {
            setError(error.message)
        }
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea type="text" placeholder="Escribí tu mensaje..." value={content} onChange={function (event) { setContent(event.target.value), setError("") }} />
                {error && <p>{error}</p>}

                <button>Enviar</button>
            </form>
        </div>
    )
}