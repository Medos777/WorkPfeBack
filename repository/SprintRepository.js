const sprint=require('../model/Sprint');
const Project = require('../model/Project');
module.exports={
    async findAll(){
        try{
            return await sprint.find();
        }catch (e){
            throw new Error(`Unable to retrieve sprints: ${e.message}`);
        }
    },
    async findById(id){
        try {
            return await sprint.findById(id);
        }catch (e){
            throw new Error(`Unable to retrieve sprint: ${e.message}`);
        }
    },
    async delete(id){
        try {
            return await sprint.findByIdAndDelete(id);
        }catch (e){
            throw new Error(`Unable to retrieve sprint: ${e.message}`);
        }
    },
    async update(id, data){
        try {
            return await sprint.findByIdAndUpdate(id, data,{new: true});
        }catch (e){
            throw new Error(`Unable to retrieve sprint: ${e.message}`);
        }
    },
    async findByProject(project) {
        try {
            return await sprint.find({project: project});
        } catch (e) {
            throw new Error(`Unable to find Issue by Project: ${e.message}`);
        }
    },
    async create(data) {
        try {
            const newSprint = new sprint(data);
            const savedSprint = await newSprint.save();

            return savedSprint;

        } catch (err) {
            throw new Error(`Unable to create sprint: ${err.message}`);
        }
    }
}