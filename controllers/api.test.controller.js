const UserService= require("../services/user.service");

const test= async(req,res)=>{
    const uService= new UserService();

    res.status(200).json( await uService.getAllUser());
}
module.exports={test}