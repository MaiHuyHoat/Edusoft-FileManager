const mysql= require('mysql')
const config= {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'edusoft_filemanager'
}
const connection= mysql.createConnection(config)
connection.connect((err)=>{
    if(err)console.log("Lỗi kết nối database: "+err)
    else console.log("Kết nối database thành công ")
})
module.exports=connection