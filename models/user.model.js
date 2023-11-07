const conn= require("../database/connect_database")

class User{
 constructor(id,memory_used,package_id,create,updated,deleted){
    this.id=id
    this.memory_used= memory_used
    this.package_id= package_id
    this.create=create
    this.updated=updated
    this.deleted= deleted
 }
    getPackage(){
        let package;
        return new Promise((resolve,reject)=>{
         let sql =  `SELECT *  FROM package WHERE id=${this.package_id} `;
        conn.query(sql,(err,rs)=>{
            if(err) reject("Không lấy được package");
            else{
               resolve(rs);
            }
        })
        })
    }
    

}