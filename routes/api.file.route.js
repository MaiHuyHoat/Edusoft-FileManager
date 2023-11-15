const express= require('express')
const route= express.Router()
const ApiFileController= require('../controllers/api.file.controller')
const controller= new ApiFileController()
route.get("/getAllFileByFolderId/:id",(req,res)=>{controller.getAllfileByFolderId(req,res)})
const multer= require('multer')

const upload = multer({
    dest: '../storage/test/',
  
  });
route.post("/upload",upload.array('file',5),(req,res)=>{controller.createFile(req,res)})
module.exports=route
