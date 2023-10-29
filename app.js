const express= require('express')
const app= express()
const port=  process.env.port || 3000;
const host='localhost'
const ejs= require('ejs')
app.set('view engine','ejs')
app.use("/public",express.static('public'))
app.listen(port,host,(err)=>{
    if(err) console.log(err);
    else console.log(`Server is running on : http://${host}:${port}`)
})

const indexRoute= require('./routes/index.route')


app.use('/',indexRoute);