import ChannelsList from "../../Components/ChannelsList/ChannelsList"
import MembersList from "../../Components/MembersList/MembersList"
import WorkspaceById from "../../Components/WorkspaceById/WorkspaceById"
import WorkspaceContextProvider from "../../Context/WorkspaceContext"

function WorkspaceScreen (){
   return(
    <WorkspaceContextProvider>
        <WorkspaceById/>
        <ChannelsList/>
        <MembersList/>
    </WorkspaceContextProvider>
   )
}

export default WorkspaceScreen