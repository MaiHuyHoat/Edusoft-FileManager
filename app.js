const express= require('express')
const app= express()
const port=  process.env.PORT  || 3000;
const host='localhost'
app.set('view engine','ejs')
app.use("/public",express.static('public'))
app.use("/storage",express.static('storage'))

// Sử dụng body-parser để xử lý dữ liệu form
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// định nghĩa các tham số sử dụng trong toàn bộ dự án
global.__pathStorage="storage"
// Các route sử dụng trong dự án
const appRoute= require("./appRoute");
appRoute.map((object,index)=>{
   return app.use(object.path,object.route)
})

app.listen(port,(err)=>{
    if(err) console.log(err);
    else console.log(`Server is running on : http://${host}:${port}`)
})