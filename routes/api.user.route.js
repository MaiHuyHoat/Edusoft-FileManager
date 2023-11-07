const express= require('express')
const route= express.Router();
const controllerApiUser = require("../controllers/api.user.controller");
const controller = new controllerApiUser()

route.get("/",(req,res)=>{controller.getAllUser(req,res)});
route.get("/:id",(req,res)=>{controller.getDetailUserById(req,res)})
module.exports=route;