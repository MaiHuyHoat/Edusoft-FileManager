const express= require('express')
const path= require('path')
const fs= require('fs')
class  ShareFile{
    constructor(){}
    index(req,rsp){
        var user_folder= req.params.user_id;
        var file = req.params.path_file;
        var filePath= path.join(__pathStorage,user_folder,file)
        console.log("user folder: "+req.params.user_id)
        console.log(filePath)
        if (fs.existsSync(filePath)) {
            rsp.download(filePath); // Sử dụng phương thức `res.download` để gửi file đến trình duyệt
          } else {
            rsp.status(404).send('File không tồn tại');
          }
    }
}
module.exports=ShareFile