// Các route sử dụng trong dự án
const index= require('./routes/index.route')
const shareFile= require('./routes/share_file.route')
const apiUser= require("./routes/api.user.route")
const apiFolder= require("./routes/api.folder.route")
const appRoutes=[
    {
        path:"/",
        route: index
    },
    {
        path:"/share",
        route: shareFile
    },
    {
        path:"/api/user",
        route: apiUser
    },
    {
        path:"/api/folder",
        route: apiFolder
    }
]
module.exports=appRoutes
