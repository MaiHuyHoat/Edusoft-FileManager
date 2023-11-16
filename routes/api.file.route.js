const express= require('express')
const route= express.Router()
const ApiFileController= require('../controllers/api.file.controller')
const multerConfig= require("../configs/multer.config")
const controller= new ApiFileController()
route.get("/getAllFileByFolderId/:id",(req,res)=>{controller.getAllfileByFolderId(req,res)})

route.post("/upload",multerConfig.array('file',5),(req,res)=>{controller.createFile(req,res)})
module.exports=route
