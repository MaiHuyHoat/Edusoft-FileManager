const FolerService= require("../services/folder.service")

class ApiFolder{
  constructor(){
    this.fService= new FolerService();
  }
  async getAllByUserName(req,res){
       var userName= req.params.userName;
       var folders= await this.fService.getAllByUserName(userName);
    
       res.status(200).json(folders);
  }
}
module.exports = ApiFolder