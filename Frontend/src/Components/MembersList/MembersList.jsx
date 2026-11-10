import { useContext } from "react";
import { WorkspaceContext } from "../../Context/WorkspaceContext";

export default function MembersList(){
    const {members_response, members_loading, members_error, reloadMembers} = useContext(WorkspaceContext)

    if (members_loading) {
        return<span>Cargando...</span>
    }
    else if (members_error) {
       return <div>
           <span>ERROR: {members_error}</span>
           <button onClick={reloadMembers}>Recargar</button>
       </div>
    }
    else if (!members_response) {
        return <div>
            <span>Error: Ocurrió un problema al obtener la lista de Members</span>
            <button onClick={reloadMembers}>Recargar</button>
        </div>
            
    }
    else if (members_response && members_response.data.length === 0) {
        return <p>No hay ningún miembro</p>
    }
     else {
        return <div>
            {members_response.data.map((member) => (
                <div key={member._id}>
                    {member.fk_id_usuario.nombre}
                </div>
            ))}
        </div>
    }
}
