import { Link, useParams, useNavigate } from "react-router"
import useForm from "../../hooks/useForm"
import useRequest from "../../hooks/useRequest"
import { useContext } from "react"
import { WorkspaceContext } from "../../Context/WorkspaceContext"
import { createChannel } from "../../services/channelService"
import Message from "../../Components/Message/Message"
import { Button } from "../../Components/Form/Form"
import "./NewChannel.css"

function NewChannelScreen() {
    const initial_state = { name: '', description: '' }
    const { workspace_id } = useParams()
    const { formState, handleChangeInput } = useForm(initial_state)
    const { response, error, loading, sendRequest } = useRequest()
    const navigate = useNavigate() 

    async function handleSubmit(event) {
        event.preventDefault()
        const response = await sendRequest(
            () => createChannel(formState.name, formState.description, workspace_id)
        )

        if (response && response.ok) {
            navigate(`/workspace/${workspace_id}/${response.data.channel_created._id}`)
        }
    }

    return (
        <div className="new-channel-modal">
            <div className="new-channel-modal__content">
                <Link
                    className="new-channel-modal__close"
                    to={`/workspace/${workspace_id}`}
                    aria-label="Cerrar"
                >
                    ×
                </Link>

                <h1 className="new-channel-modal__title">Asigna un nombre a tu canal</h1>

                <form className="new-channel-modal__form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" name="name" id="name" maxLength={30} placeholder="Nombre del canal" value={formState.name} onChange={handleChangeInput} />
                    </div>

                    <div>
                        <label htmlFor="description">Descripción:</label>
                        <textarea name="description" id="description" maxLength={500} placeholder="Descripción para el canal" value={formState.description} onChange={handleChangeInput} />
                    </div>

                    {
                        error && !loading &&
                        <Message type="error">
                            ERROR: {error}
                        </Message>
                    }

                    <Button type="submit" loading={loading}>
                        Crear canal
                    </Button>
                </form>
            </div>
        </div>
    )

}

export default NewChannelScreen