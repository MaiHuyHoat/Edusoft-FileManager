const FolerService= require("../services/folder.service")

class ApiFolder{
  constructor(){
    this.fService= new FolerService();
  }
  async getAllByUserName(req,res){
       var userName= req.params.userName;
       var listFolder= await this.fService.getAllByUserName(userName);
       if(listFolder.length>0){
        res.status(200).json(listFolder);
       }else{
        res.status(400).json([])
       }

  }
  
}
module.exports = ApiFolder