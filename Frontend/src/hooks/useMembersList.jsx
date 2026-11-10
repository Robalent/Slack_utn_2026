import { useEffect } from "react";
import useRequest from "./useRequest";
import { getAllMembershipsByWorkspaceId } from "../services/memberService";

function useMembersList(workspace_id){
    const {response, error, loading, sendRequest} = useRequest()

    useEffect(
        ()=>{
            sendRequest(
                ()=> getAllMembershipsByWorkspaceId(workspace_id)
            )
        },
        [workspace_id]
    )

    function reloadMembers() {
            sendRequest(
                () => getAllMembershipsByWorkspaceId(workspace_id)
            )
        }

    return{
        members_response: response,
        members_error: error,
        members_loading: loading, 
        reloadMembers
    }
}

export default useMembersList