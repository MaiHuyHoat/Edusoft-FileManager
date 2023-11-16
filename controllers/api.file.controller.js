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
  async createFile(req,res){
    console.log("Có người upload file")
     var idFolder= req.body.idFolder;
    
     if (!req.files || req.files.length === 0) {
      return res.status(400).send('No file uploaded.');
    }
  
    // Lặp qua danh sách các file và hiển thị thông tin
    req.files.forEach((file, index) => {
      console.log("file upload : "+file.path)
    });
    
    
     res.status(200).json("Upload file thanh cong")
     
  }
}
module.exports= ApiFile