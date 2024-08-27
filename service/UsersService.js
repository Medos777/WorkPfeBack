const userRepository = require('../repository/UsersRepository');
module.exports  = {
    async findAll(){
        return await userRepository.findAll();
    },
    async findById(id) {
        return await userRepository.findById(id);
    },
    async findByRole(role){
        return await userRepository.findByRole(role);
    },
    async create(data){
       return await userRepository.create(data);
    },
    async update (id, data){
        return await userRepository.update(id, data);
    },
    async delete(id){
        return await userRepository.delete(id);
    }
}