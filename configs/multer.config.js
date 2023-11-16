const multer= require('multer')
const FolderService= require('../services/folder.service')
const folderService= new FolderService();
const uuid= require('uuid')
const storage= multer.diskStorage({
    destination: async(req,file,cb)=>{
     var idFolder= req.body.idFolder;
     var pathFolder= await folderService.getFolderById(idFolder);
     cb(null,pathFolder[0].path)
    },
    filename:(req,file,cb)=>{
       var filename= `${uuid.v4()}-${file.originalname}`;
       cb(null,filename)
    }

})
const fileFilter= function(req,file,cb){
  if(file.originalname.endsWith('.jpg')){
    cb(null,true)
  }else{
    cb(null,false)
  }
}
const limits= {
    fileSize:1024*1024*10, // tối đa 10mb
    files:5, // tối đa 5 file
}
const config= multer({
    storage:storage,
    fileFilter: fileFilter,
    limits: limits

})
module.exports=config