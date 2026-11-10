import { useEffect } from "react";
import useRequest from "./useRequest.jsx";
import { getAllChannelsByWorkspaceId } from "../services/channelService.js";


function useChannelsList(workspace_id) {
    const { response, error, loading, sendRequest } = useRequest()

    useEffect(
        () => {
            sendRequest(
                () => getAllChannelsByWorkspaceId(workspace_id)
            )
        },
        [workspace_id]
    )

    function reloadChannels() {
        sendRequest(
            () => getAllChannelsByWorkspaceId(workspace_id)
        )
    }


    return {
        channels_response: response,
        channels_error: error,
        channels_loading: loading,
        reloadChannels
    }
}

export default useChannelsList
