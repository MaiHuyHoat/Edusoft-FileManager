class DocumentManager{
    constructor(){}
    index(req,rsp){
        rsp.render('index',{
            'page':'document_manager',
            'css':'document_manager'
        })
    }
}
module.exports= DocumentManager