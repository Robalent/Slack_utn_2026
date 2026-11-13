import { Link } from "react-router"
import useWorkspaceList from "../../hooks/useWorkspaceList"
import './WorkspaceList.css'

const WORKSPACE_AVATAR_URL = 'https://a.slack-edge.com/80588/img/avatars-teams/ava_0018-88.png'

export default function WorkspaceList() {
    const { workspaces_response, workspaces_error, workspaces_loading, reloadWorkspaces } = useWorkspaceList()

    return (
        <section className="workspace-card">
            <h2 className="workspace-card__title">Mis espacios de trabajo</h2>

            {
                workspaces_loading &&
                <p className="workspace-card__status">Cargando espacios de trabajo...</p>
            }

            {
                (workspaces_error || !workspaces_response) && !workspaces_loading &&
                <div className="workspace-card__status">
                    ERROR: {workspaces_error || 'Ocurrió un problema al obtener la lista de Workspaces'}
                    <button className="workspace-card__reload" onClick={reloadWorkspaces}>
                        Recargar
                    </button>
                </div>
            }

            {
                workspaces_response && !workspaces_loading && workspaces_response.data.length === 0 &&
                <p className="workspace-card__status">
                    Aún no creaste ningún Workspace
                </p>
            }

            {
                workspaces_response && !workspaces_loading && workspaces_response.data.length > 0 &&
                <ul className="workspace-card__list">
                    {
                        workspaces_response.data.map((workspace) => (
                            <li key={workspace.member_id}>
                                <Link
                                    to={`/workspace/${workspace.workspace_id}`}
                                    className="workspace-card__item"
                                >
                                    <img
                                        className="workspace-card__avatar"
                                        src={WORKSPACE_AVATAR_URL}
                                        alt={workspace.workspace_nombre}
                                    />
                                    <div className="workspace-card__info">
                                        <span className="workspace-card__name">
                                            {workspace.workspace_nombre}
                                        </span>
                                        <span className="workspace-card__meta">
                                            {workspace.miembros.length} miembro{workspace.miembros.length !== 1 ? 's' : ''}
                                            {' · '}tu rol: {workspace.member_rol}
                                        </span>
                                        <ul className="workspace-card__members">
                                            {
                                                workspace.miembros.map((miembro, index) => (
                                                    <li
                                                        key={index}
                                                        className={`workspace-card__member workspace-card__member--${miembro.rol}`}
                                                    >
                                                        <span className="workspace-card__member-name">
                                                            {miembro.nombre}
                                                        </span>
                                                        <span className="workspace-card__member-role">
                                                            {miembro.rol}
                                                        </span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            }

            <Link to="/workspaces/new" className="workspace-card__create">
                + Crear un nuevo espacio de trabajo
            </Link>
        </section>
    )
}
