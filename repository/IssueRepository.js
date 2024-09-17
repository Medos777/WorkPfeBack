const issue=require('../model/Issue');
const Issue = require("./IssueRepository");
const Project = require("../model/Project");
const Users = require("../model/Users");

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
    }
}