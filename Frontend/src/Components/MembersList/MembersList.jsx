import { useContext, useState } from "react";
import { WorkspaceContext } from "../../Context/WorkspaceContext";
import useForm from "../../hooks/useForm";
import { useParams } from "react-router";
import { createWorkspaceMember } from "../../services/workspaceService";
import useRequest from "../../hooks/useRequest";
import "./MembersList.css"

export default function MembersList() {
    const { members_response, members_loading, members_error, reloadMembers, workspace_response } = useContext(WorkspaceContext)
    const [show_form, setShowForm] = useState(false)
    const initial_state = { email: '', rol: 'user' }
    const { formState, handleChangeInput, setFormValues } = useForm(initial_state)
    const user_role = workspace_response?.data?.membership?.rol
    const {workspace_id} = useParams()
    const {response, error, loading, sendRequest} = useRequest()

    async function handleSubmit(event) {
        event.preventDefault()
        const response = await sendRequest(
            () => createWorkspaceMember(workspace_id, formState.email, formState.rol)
        )
        if(response && response.ok){
            reloadMembers()
            setShowForm(false)
            setFormValues(initial_state)
        }
    }

    if (members_loading) {
        return <span className="members-list members-list--status">Cargando...</span>
    }
    else if (members_error) {
        return <div className="members-list members-list--error">
            <span>ERROR: {members_error}</span>
            <button onClick={reloadMembers}>Recargar</button>
        </div>
    }
    else if (!members_response) {
        return <div className="members-list members-list--error">
            <span>Error: Ocurrió un problema al obtener la lista de Members</span>
            <button onClick={reloadMembers}>Recargar</button>
        </div>

    } else {
        return <div className="members-list">
            <div className="members-list__header">
                <h3>Miembros</h3>
                {(user_role === 'admin' || user_role === 'owner') && (
                    <button className="members-list__create" onClick={function () {
                        setShowForm(!show_form)
                    }}>+</button>
                )}
            </div>

            {members_response.data.length > 0
                ? members_response.data.map((member) => (
                    <div className="members-list__item" key={member._id}>
                        {member.fk_id_usuario.nombre}
                    </div>
                ))
                : <p>No hay ningún miembro </p>
            }

            {show_form && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Agregar Miembro</h3>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email del miembro a invitar:</label>
                            <input type="email" name="email" id="email" placeholder="miembro@email.com" value={formState.email} onChange={handleChangeInput} />
                            {user_role === 'owner' && (
                                <>
                                    <label htmlFor="rol">Seleccioná el rol del miembro</label>
                                    <select name="rol" id="rol" value={formState.rol} onChange={handleChangeInput}>
                                        <option value="user">Usuario</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </>
                            )}

                            <button type="submit" disabled={loading}>{loading ? 'Agregando...' : 'Agregar'}</button>
                        </form>
                        {error && <p>{error}</p>}
                        <button onClick={function () { setShowForm(false) }}>Cancelar</button>
                    </div>
                </div>
            )}

        </div>
    }
}
