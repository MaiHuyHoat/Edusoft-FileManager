const express= require('express')
const route= express.Router()
const ApiFileController= require('../controllers/api.file.controller')
const controller= new ApiFileController()
route.get("/getAllFileByFolderId/:id",(req,res)=>{controller.getAllfileByFolderId(req,res)})
module.exports=route
