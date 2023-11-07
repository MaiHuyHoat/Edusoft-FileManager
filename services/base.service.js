class BaseService{
   constructor() {
    this.conn= require("../database/connect_database")
   }
   getAll(table){
    return new Promise((resolve,reject)=>{
        let sql =  `SELECT *  FROM ${table} `;
       this.conn.query(sql,(err,rs)=>{
 
           if(err) reject("Không lấy được dữ liệu từ bảng :"+table);
           else{
           
              resolve(rs);
           }
       })
       })
   }

}
module.exports=BaseService;