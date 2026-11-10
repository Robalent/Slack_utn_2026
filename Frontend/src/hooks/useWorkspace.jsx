import { useEffect } from "react"
import { getWorkspaceById } from "../services/workspaceService.js"
import useRequest from "./useRequest"

function useWorkspace(workspace_id){
    const {response, error, loading, sendRequest} = useRequest()

    useEffect(
        ()=>{
            sendRequest(
                () => getWorkspaceById(workspace_id)
            )
        },
        [workspace_id]
    )

    return{
        workspace_response: response, 
        workspace_error: error,
        workspace_loading: loading
    }
}

export default useWorkspace