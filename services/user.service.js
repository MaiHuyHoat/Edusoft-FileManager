
const BaseService= require("./base.service")
class UserService extends BaseService{
 constructor(){
 super();
 }
  async getAllUser(){
    return await super.getAll("user");
  }
  async getDetailUserById(id){
    return await super.getDetail("user",id)
  }
}
module.exports=UserService;