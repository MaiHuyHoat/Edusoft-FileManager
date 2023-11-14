const FileService= require("../services/file.service")
class ApiFile{
  constructor(){
    this.fiService= new FileService()
  }
  async getAllfileByFolderId(req,res){
        var idFolder= req.params.id;
        var listFile= await this.fiService.getAllFileByFolderId(idFolder)
        if(listFile.length>0){
            res.status(200).json(listFile)
        }else{
            res.status(400).json([])
        }
    
  }
}
module.exports= ApiFile