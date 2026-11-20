import { Outlet } from "react-router"
import ChannelsList from "../../Components/ChannelsList/ChannelsList"
import MembersList from "../../Components/MembersList/MembersList"
import WorkspaceById from "../../Components/WorkspaceById/WorkspaceById"
import WorkspaceContextProvider from "../../Context/WorkspaceContext"

function WorkspaceScreen() {
    return (
        <WorkspaceContextProvider>
            <WorkspaceById />
            <div>
                <aside>
                    <ChannelsList />
                    <MembersList />
                </aside>
                
                <main>
                    <Outlet />
                </main>
            </div>
        </WorkspaceContextProvider>
    )
}

export default WorkspaceScreen