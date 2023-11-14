const BaseService= require("./base.service")
const File= require("../models/file.model")
class FileService extends BaseService{
    constructor(){
        super()
    }
    async getAllFileByFolderId(id){
        var sql=`SELECT f.*,fc.name as name_category, fc.image as image_category FROM file f
        INNER JOIN file_category fc on fc.id= f.file_category_id
        WHERE f.folder_id=${id}  `
        var dataReturn= await super.executeQuery(sql);
      
       
        return dataReturn;


    }
}
module.exports = FileService