const issueRepository = require('../repository/IssueRepository');
module.exports  = {
    async findAll(){
        return await issueRepository.findAll();
    },
    async findById(id) {
        return await issueRepository.findById(id);
    },
    async findByProject(project){
        return await issueRepository.findByProject(project);
    },
    async create(data){
        return await issueRepository.create(data);
    },
    async update (id, data){
        return await issueRepository.update(id, data);
    },
    async delete(id){
        return await issueRepository.delete(id);
    }
}