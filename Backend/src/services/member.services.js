import member_repository from "../repositories/member.repository.js";

export async function getAllMembershipsByWorkspaceId({workspace_id}){
    const members = await member_repository.getAllMembershipsByWorkspaceId(workspace_id)

    return members
}