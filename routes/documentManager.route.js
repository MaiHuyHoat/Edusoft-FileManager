const express= require('express')
const route= express.Router();
const documentManagerControler= require('../controllers/documentManager.controller')
const documentManager= new documentManagerControler()

route.get('/',(req,rsp)=>documentManager.index(req,rsp))


module.exports=route

