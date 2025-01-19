const Project=require('../model/Project');
module.exports={
    async findAll(){
        try {
            return await Project.find();
        }catch (err){
            throw new Error(`Error retrieving projects: ${err.message}`);
        }
    },
    async findById(id){
        try {
            return await Project.findById(id);
        }catch (err){
            throw new Error(`Error finding project: ${err.message}`);
        }
    },
    async delete(id){
        try {
            return await Project.findByIdAndDelete(id);
        }catch (err){
            throw new Error(`Error deleting project: ${err.message}`);
        }
    },
    async update(id, data){
        try {
            return await Project.findByIdAndUpdate(id, data,{new: true});
        }catch (err){
            throw new Error(`Error updating project: ${err.message}`);
        }
    },
    async create(data){
        try {
            const project = new Project(data);
            return await project.save();
        }catch (err){
            throw new Error(`Error creating project: ${err.message}`);
        }
    },
}