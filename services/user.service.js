
const BaseService= require("./base.service")
class UserService extends BaseService{
 constructor(){
 super();
 }
  async getAllUser(){
    return await super.getAll("user");
  }
}
module.exports=UserService;