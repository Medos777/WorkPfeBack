const usersService = require('../service/UsersService');
module.exports ={
    async findAll(req,res){
        const users = await usersService.findAll();
        res.json(users);
    },
    async findById(req,res,next){
        try {
            const user = await usersService.findById(req.params.id);
            res.json(user);
        }catch (error){
            next(error);
        }
    },
    async create(req,res,next){
        try {
            const user = await usersService.create(req.body);
            res.json(user);

        }catch (error){
            console.error(error);
            res.status(500).send(error);
            next(error);
        }
    },
    async update(req,res,next){
        try {
            const user = await usersService.update(req.params.id,req.body);
            res.json(user);
        }catch (error){
            next(error);
        }
    },
    async delete(req,res,next){
        try {
            const result = await usersService.delete(req.params.id);
            res.json(result);
        }catch (error){
            next(error);
            console.error(error);
        }
    }
}