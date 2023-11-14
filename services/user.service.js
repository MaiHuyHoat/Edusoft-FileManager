
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
  async getDetailUserByUserName(name){
    var sql = `SELECT * FROM user u where u.name like '%${name}%' limit 1 `;

    return await super.executeQuery("user",sql)

  }
}
module.exports=UserService;