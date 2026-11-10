import React, { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { getAllWorkspaces } from "../../services/workspaceService";
import WorkspaceList from "../../Components/WorkspaceList/WorkspaceList";

function HomeScreen () {
   
    return (
        <div>
            <h1>Bienvenido A slack!</h1>
            <div>
                <h2>Mis espacios de trabajo:</h2>
                <WorkspaceList/>
            </div>
        </div>
    )

    
}

export default HomeScreen