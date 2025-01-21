const sprint=require('../model/Sprint');
const Project = require('../model/Project');
module.exports={
    async findAll(){
        try{
            return await sprint.find().populate('project').populate('backlogItems');;
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
    async findByProjectId(projectId) {
        try {
            console.log('Repository: Finding sprints for project ID:', projectId);
            const results = await sprint.find({ project: projectId })
                .populate('project')
                .populate('backlogItems');
            console.log('Repository: Found sprints:', results);
            return results;
        } catch (err) {
            console.error('Repository: Error finding sprints:', err);
            throw new Error(`Unable to find sprints for project: ${err.message}`);
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