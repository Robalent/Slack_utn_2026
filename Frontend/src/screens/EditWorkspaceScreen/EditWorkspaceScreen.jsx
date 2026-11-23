import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { WorkspaceContext } from "../../Context/WorkspaceContext";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";
import { updateWorkspace } from "../../services/workspaceService";
import Message from "../../Components/Message/Message";
import { Button } from "../../Components/Form/Form";


function EditWorkspaceScreen() {
    const { workspace_id } = useParams()
    const { workspace_response, workspace_error, workspace_loading, reloadWorkspace } = useContext(WorkspaceContext)
    const initial_state = { name: '', description: '' }
    const { formState, handleChangeInput, setFormValues } = useForm(initial_state)
    const { response, error, loading, sendRequest } = useRequest()
    const navigate = useNavigate()


    useEffect(function () {
        if (workspace_response) {
            const workspace = workspace_response.data.workspace_selected

            setFormValues({
                name: workspace.nombre,
                description: workspace.descripcion
            })
        }
    }, [workspace_response])

    async function handleSubmit(event) {
        event.preventDefault()
        const response = await sendRequest(
            () => updateWorkspace(workspace_id, formState.name, formState.description)
        )

        if (response && response.ok) {
            reloadWorkspace()
            navigate(`/workspace/${workspace_id}`)
        }
    }

    if (workspace_loading) {
        return <span>Cargando...</span>
    }
    else if (workspace_error) {
        return <span>ERROR: {workspace_error}</span>
    }
    else if (!workspace_response) {
        return <span>No se pudo obtener el workspace</span>
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nuevo nombre:</label>
                <input type="text" name="name" id="name" maxLength={30} value={formState.name} onChange={handleChangeInput} />
                <p>{formState.name.length}/30 caracteres</p>

                <label htmlFor="description">Nueva descripción:</label>
                <textarea name="description" id="description" value={formState.description} onChange={handleChangeInput}></textarea>

                {
                    error && !loading &&
                    <Message type="error">
                        ERROR: {error}
                    </Message>
                }
                <Button type="submit" loading={loading}>
                    Editar Workspace
                </Button>
            </form>
        </div>
    )

}

export default EditWorkspaceScreen