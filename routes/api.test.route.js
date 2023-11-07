const express= require('express')
const route= express.Router();
const controllerR = require("../controllers/api.test.controller");

route.get("/user",(req,res)=>{controllerR.test(req,res)});
module.exports=route;