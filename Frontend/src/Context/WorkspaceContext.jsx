import { createContext } from "react";
import { useParams } from "react-router";
import useWorkspace from "../hooks/useWorkspace";
import useChannelsList from "../hooks/useChannelsList";
import useMembersList from "../hooks/useMembersList";

export const WorkspaceContext = createContext(null)

export default function WorkspaceContextProvider({children}) {
    const {workspace_id} = useParams()
    const {workspace_response, workspace_loading, workspace_error} = useWorkspace(workspace_id)
    const {channels_response, channels_loading, channels_error, reloadChannels} = useChannelsList(workspace_id)
    const {members_response, members_loading, members_error, reloadMembers} = useMembersList(workspace_id)
    return(
        <WorkspaceContext.Provider value={{workspace_error, workspace_loading, workspace_response, channels_loading, channels_response, channels_error, reloadChannels, members_response, members_loading, members_error, reloadMembers}}>
            {children}
        </WorkspaceContext.Provider>
    )
}