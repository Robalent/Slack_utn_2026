import { useEffect } from "react";
import useRequest from "./useRequest";
import { getChannelById } from "../services/channelService.js";

function useChannel(channel_id, workspace_id){
    const {response, error, loading, sendRequest} = useRequest()

    useEffect(
        () => {
            sendRequest(
                () => getChannelById(channel_id, workspace_id)
            )
        },
        [channel_id, workspace_id]
    )

    function reloadChannel(){
        sendRequest(
            () => getChannelById(channel_id, workspace_id)
        )
    }

    return {
        channel_response: response,
        channel_error: error,
        channel_loading: loading,
        reloadChannel
    } 
}

export default useChannel