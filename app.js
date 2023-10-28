const express= require('express')
const app= express()
const port=3060
const host='localhost'
const ejs= require('ejs')
app.set('view engine','ejs')
app.use("/public",express.static('public'))
app.listen(port,host,(err)=>{
    if(err) console.log(err);
    else console.log(`Server is running on : http://${host}:${port}`)
})

const documentManagerRoute= require('./routes/documentManager.route')

app.get('/',(req,rsp)=>{
    rsp.send("hello world")
})
app.use('/documents',documentManagerRoute);