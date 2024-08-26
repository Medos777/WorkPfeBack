const Users = require('../model/Users');

module.exports = {
    async findAll(){
        return await Users.find();

    },
    async findById(id){
        return await Users.findById(id);

    },

    async update (id, data){
        return await Users.findByIdAndUpdate(id, data, {new : true});

    },
    async delete(id){
        return await Users.findByIdAndRemove(id);
    },

    async create(data){

        const  users = new Users(data);
        return await users.save();
    }


}