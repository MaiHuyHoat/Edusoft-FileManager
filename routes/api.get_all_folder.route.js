const express= require('express')
const route= express.Router()
const apiGetAllFolderController= require("../controllers/api.get_all_folder.controller");
const controller= new apiGetAllFolderController();
route.get("/:userName",(req,res)=>controller.get(req,res))
module.exports=route;