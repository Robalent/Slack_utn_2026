import { Outlet } from "react-router"
import ChannelsList from "../../Components/ChannelsList/ChannelsList"
import MembersList from "../../Components/MembersList/MembersList"
import WorkspaceById from "../../Components/WorkspaceById/WorkspaceById"
import WorkspaceContextProvider from "../../Context/WorkspaceContext"
import "./WorkspaceScreen.css"

function WorkspaceScreen() {
    return (
        <WorkspaceContextProvider>
            <div className="workspace">
                <input
                    id="workspace-menu"
                    type="checkbox"
                    className="workspace__menu-toggle"
                />

                <header className="workspace__header">
                    <label
                        htmlFor="workspace-menu"
                        className="workspace__menu-button"
                        aria-label="Abrir o cerrar menú"
                    >
                        <span aria-hidden="true">☰</span>
                    </label>

                    <WorkspaceById />
                </header>

                <label
                    htmlFor="workspace-menu"
                    className="workspace__backdrop"
                    aria-label="Cerrar menú"
                />

                <div className="workspace__body">
                    <aside className="workspace__sidebar">
                        <ChannelsList />
                        <MembersList />
                    </aside>

                    <main className="workspace__main">
                        <Outlet />
                    </main>
                </div>
            </div>
        </WorkspaceContextProvider>
    )
}

export default WorkspaceScreen