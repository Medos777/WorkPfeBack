const issue=require('../model/Issue');
const Project = require('../model/Project');
module.exports={
    async findAll(){
        try{
            return await issue.find();
        }catch (e){
            throw new Error(`Unable to retrieve Issues: ${e.message}`);
        }
    },
    async findById(id){
        try {
            return await Issue.findById(id);
        }catch (e){
            throw new Error(`Unable to retrieve ISSUES: ${e.message}`);
        }
    },
    async delete(id){
        try {
            return await issue.findByIdAndDelete(id);
        }catch (e){
            throw new Error(`Unable to retrieve Issues: ${e.message}`);
        }
    },
    async update(id, data){
        try {
            return await issue.findByIdAndUpdate(id, data,{new: true});
        }catch (e){
            throw new Error(`Unable to retrieve users: ${e.message}`);
        }
    },
    async findByProject(project) {
        try {
            return await issue.find({project: project});
        } catch (e) {
            throw new Error(`Unable to find Issue by Project: ${e.message}`);
        }
    },
    async create(data) {
        try {
            const newIssue = new issue(data);
            const savedIssue = await newIssue.save();
            const project = await Project.findById(data.project);
            if (!project){
                throw new Error('Project with id ${data.project} not found');
            }
            project.issues.push(savedIssue._id);
            await project.save();

            return savedIssue;

        } catch (err) {
            throw new Error(`Unable to create issue: ${err.message}`);
        }
    }
}