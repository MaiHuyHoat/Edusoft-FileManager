const express= require('express')
const app= express()
const port=  process.env.PORT  || 3000;
const host='localhost'
const ejs= require('ejs')
app.set('view engine','ejs')
app.use("/public",express.static('public'))
app.use("/storage",express.static('storage'))
app.listen(port,(err)=>{
    if(err) console.log(err);
    else console.log(`Server is running on : http://${host}:${port}`)
})
// định nghĩa các tham số sử dụng trong toàn bộ dự án
global.__pathStorage="storage"

const indexRoute= require('./routes/index.route')
const shareFileRoute= require('./routes/share_file.route')

app.use('/',indexRoute);
app.use('/share',shareFileRoute)