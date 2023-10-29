const express= require('express')
const route= express.Router();
const Controller= require('../controllers/index.controller')
const controller= new Controller();

route.get('/',(req,rsp)=>controller.index(req,rsp))


module.exports=route

