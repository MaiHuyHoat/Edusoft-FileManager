const { rejects } = require("assert");
const { resolve } = require("path");

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
   getDetail(table,id){
    return new Promise((resolve,reject)=>{
        let sql= `SELECT * FROM ${table} WHERE id=${id} LIMIT 1 `;
        this.conn.query(sql,(err,rs)=>{
            if(err) reject(`Không lấy được chi tiết object có id:${id} trong bảng ${table}`)
            else resolve(rs);
        })
    })
   }
   executeQuery(sql){
    return new Promise((resolve,reject)=>{
        this.conn.query(sql,(err,rs)=>{
            if(err) reject(`Lỗi thực hiện truy vấn : `+err)
            else resolve(rs)
        })
    })
   }
  

}
module.exports=BaseService;