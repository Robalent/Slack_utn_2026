import { createContext } from "react";
import { useParams } from "react-router";
import useChannel from "../hooks/useChannel";
import useChannelMessage from "../hooks/useChannelMessage";

export const ChannelContext = createContext(null)

export default function ChannelContextProvider({children}){
    const {channel_id, workspace_id} = useParams()
    const {channel_response, channel_error, channel_loading, reloadChannel} = useChannel(channel_id, workspace_id)
    const {messages_response, messages_error, messages_loading, reloadMessages} = useChannelMessage(channel_id, workspace_id)

    return (
        <ChannelContext.Provider value={{channel_response, channel_error, channel_loading, reloadChannel, messages_response, messages_error, messages_loading, reloadMessages}}>
            {children}
        </ChannelContext.Provider>
    )
}
