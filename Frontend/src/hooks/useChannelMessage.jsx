import { useEffect } from "react";
import useRequest from "./useRequest";
import { getAllMessagesByChannelId } from "../services/messageService.js";

function useChannelMessage(channel_id, workspace_id){
    const {response, error, loading, sendRequest} = useRequest()

    useEffect(
        ()=> {
            sendRequest (
                () => getAllMessagesByChannelId(channel_id, workspace_id)
            )
        },
        [channel_id, workspace_id]
    )

    function reloadMessages(){
        sendRequest(
            () => getAllMessagesByChannelId(channel_id, workspace_id)
        )
    }

    return{
        messages_response: response,
        messages_error: error,
        messages_loading: loading, 
        reloadMessages
    }
}

export default useChannelMessage
