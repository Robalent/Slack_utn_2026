import Channel from "../../Components/Channel/Channel";
import ChannelContextProvider from "../../Context/ChannelContext";

function ChannelScreen(){
    return(
        <ChannelContextProvider>
            <Channel/>
        </ChannelContextProvider>
    )
}

export default ChannelScreen