const express= require('express')
const route= express.Router();
const ShareFileController= require("../controllers/share_file.controller");
const controller= new ShareFileController();
route.get("/:user_id/:path_file",(req,rsp)=>{controller.index(req,rsp)})
module.exports=route