const ProjectRepository = require('../repository/ProjectRepository');

module.exports={
    async findAll(){
        return await ProjectRepository.findAll();
    },
    async findById(id) {
        return await ProjectRepository.findById(id);
    },

    async create(data){
        return await ProjectRepository.create(data);
    },
    async update (id, data){
        return await ProjectRepository.update(id, data);
    },
    async delete(id){
        return await ProjectRepository.delete(id);
    }
}