// Các route sử dụng trong dự án
const index= require('./routes/index.route')
const shareFile= require('./routes/share_file.route')
const apiUser= require("./routes/api.user.route")
const apiGetAllFolder= require("./routes/api.get_all_folder.route")
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
        path:"/api/getAllFolder",
        route: apiGetAllFolder
    }
]
module.exports=appRoutes
