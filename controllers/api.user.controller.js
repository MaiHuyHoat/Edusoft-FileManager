const UserService= require("../services/user.service");
class ApiUser{
    constructor(){
        this.uService= new UserService();
    }
    async getAllUser(req,res){
        res.status(200).json( await this.uService.getAllUser());  
    }
    async getDetailUserById(req,res){
        let id= req.params.id;
        res.status(200).json(await this.uService.getDetailUserById(id))
    }
}

module.exports=ApiUser