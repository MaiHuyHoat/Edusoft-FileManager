const express= require('express')
const route= express.Router()
const FolderController= require("../controllers/api.folder.controller");
const controller= new FolderController();
route.get("/getAllByUserName/:userName",(req,res)=>controller.getAllByUserName(req,res))
module.exports=route;