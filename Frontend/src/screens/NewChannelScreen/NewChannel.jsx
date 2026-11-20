import { useParams } from "react-router"
import useForm from "../../hooks/useForm"
import useRequest from "../../hooks/useRequest"
import { useContext } from "react"
import { WorkspaceContext } from "../../Context/WorkspaceContext"
import { createChannel } from "../../services/channelService"
import Message from "../../Components/Message/Message"
import { Button } from "../../Components/Form/Form"

function NewChannelScreen() {
    const initial_state = { name: '', description: '' }
    const { workspace_id } = useParams()
    const { formState, handleChangeInput } = useForm(initial_state)
    const { response, error, loading, sendRequest } = useRequest()
    const { reloadChannels } = useContext(WorkspaceContext)

    async function handleSubmit(event) {
        event.preventDefault()
        const response = await sendRequest(
            () => createChannel(formState.name, formState.description, workspace_id)
        )

        if (response && response.ok) {
            reloadChannels()
        }
    }

    return (
        <div>
            <h1>Asigna un nombre a tu canal</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre:</label>
                <input type="text" name="name" id="name" maxLength={30} placeholder="Nombre del canal" value={formState.name} onChange={handleChangeInput} />

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
    )

}

export default NewChannelScreen