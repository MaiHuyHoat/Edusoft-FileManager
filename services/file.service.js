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
    async createFile(file){
        if(file.folder_id=== null || file.folder_id=== undefined || file.folder_id.trim()===""){
            return false;
        }
        sql=`
        INSERT INTO file ( name, path, size, folder_id, file_category_id, user_id) VALUES
        (${file.name},${file.path},${file.size},${file.folder_id},${file.file_category_id},${file.user_id})`
         await super.executeQuery(sql);
         return true;
    }
}
module.exports = FileService