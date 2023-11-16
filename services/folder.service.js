 const BaseService= require("./base.service")
 const UserService= require("./user.service")
const Folder= require("../models/folder.model");
 class FolderService extends BaseService{
    constructor(){
        super()
        this.uService= new UserService();
    }
   async getAllByUserName(userName){
        var userRs= await this.uService.getDetailUserByUserName(userName);
   
        var sql= `SELECT f.* FROM folder f INNER JOIN user u ON f.user_id=u.id where f.user_id=${userRs[0].id} `


        return await super.executeQuery(sql);
 

    }
    async getFolderById(id){
        var sql= `SELECT * FROM folder WHERE folder.id=${id}`
        return await super.executeQuery(sql)
    }
 }
 module.exports= FolderService
