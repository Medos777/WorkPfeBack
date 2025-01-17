const sprintRepository = require('../repository/SprintRepository');
module.exports  = {
    async findAll(){
        return await sprintRepository.findAll();
    },
    async findById(id) {
        return await sprintRepository.findById(id);
    },
    async findByProject(project){
        return await sprintRepository.findByProject(project);
    },
    async create(data){
        return await sprintRepository.create(data);
    },
    async update (id, data){
        return await sprintRepository.update(id, data);
    },
    async delete(id){
        return await sprintRepository.delete(id);
    },

}