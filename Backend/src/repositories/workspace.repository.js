import Workspace from "../models/workspace.models.js";


class WorkspaceRepository {
    async create(name, description) {
        const workspace_created = await Workspace.create({ nombre: name, descripcion: description })
        return workspace_created
    }

    // async getWorkspace(){
    //     const result = await Workspace.find()
    //     console.log(result)
    //     return result
    // }

    async getById(workspace_id){
        const result = await Workspace.findById(workspace_id)
        return result
    }

    async deleteById(workspace_id){
        const result = await Workspace.findByIdAndDelete(workspace_id)
        return result
    }

    async updateById(workspace_id, update_data){
        const result = await Workspace.findByIdAndUpdate(workspace_id, update_data)
        return result
    }
}

const workspace_repository = new WorkspaceRepository()
export default workspace_repository
