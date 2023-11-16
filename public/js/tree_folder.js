
document.addEventListener("DOMContentLoaded",async () => {
 getData();
});

function getData() {
  var userName = "nmhuy";
  fetch(`./api/folder/getAllByUserName/${userName}`, {
    method: "get",
    "content-type": "application/json",
  })
    .then((res) => res.json())
    .then( async(data) => {
      

      convertDataFolder(data, data[0], 0);
      // lấy root của cây thư mục
      var root = data.find(node=>{
        return node.level===0;
      })
    
      
      generateDataToUI(root)
        // gán biến folderId toàn cục hiện tại bằng id của folder
        currentFolderId= root.id;
        // generate data của folder gốc
        var listFiles= await getAllFilesByFolderId(currentFolderId)
        generateFilesToUI(listFiles)


    })
    .catch((err) => console.log(err));
}
function convertDataFolder(data, parent, level) {
  //thêm thuộc tính cấp thư mục cho node : level
  parent.level = level;
  // sau khi gán thuộc tính level vào thì tăng cấp level cho các subfolder con đằng sau
  level++;
  // lấy các node folder có paren_id là của parent node hiện tại
  parent.subfolder = data.filter((node) => {
    return node.parent_id === parent.id;
  });
  // với mỗi node con thì gọi đệ quy tương tự
  parent.subfolder.forEach((node) => {
    convertDataFolder(data, node, level);
    
  });
}
function generateDataToUI(root){
    var userFoldersDiv= document.querySelector("#user-folders");
    var content= `<ul>
      ${  root.subfolder.map(subfolder=>{
        return generateFolder(subfolder)
        }).join("")}
    </ul>`
    userFoldersDiv.innerHTML=content
}
function generateFolder(node) {
  var content = ` <li>

    <!-- folder-name && action  -->
    <div class="d-flex tree-item justify-content-between">
      <div onclick="clickFolder(this)"
      folderId=${node.id}
      class="d-flex folder-name btn"
                              data-toggle="collapse" href="#collapse${node.id}"
                              role="button" aria-expanded="false"
                              aria-controls="multiCollapseExample${node.id}"
              >
        <div
          class="mr-2 leaf text-center d-flex align-items-center  icon-angle-right-file">
        ${node.subfolder.length>0 ? '<i class="fa fa-angle-right " aria-hidden="true"></i>': '<i class="fa fa-angle-right  invisible" aria-hidden="true"></i>'}
        </div>
        <div class="mr-1 d-flex align-items-center  ">
          <img src="/public//img/icon/folder.png"
            width="14.5px" height="14.5px" alt>
        </div>
        <div
          class=" h6 d-flex align-items-center justify-content-center h-100 text-dark">
          ${node.name}  <span class=" ml-2 text-lowercase text-secondary" style="font-size:12px"> (${node.size} MB)</span>
        </div>
      </div>
      <div class="d-flex action  ">
        <div
          class="add-folder-action mr-2 d-flex align-items-center pl-3 btn">

          <span class="fas fa-plus fa-xs "
            data-toggle="modal" data-level="2"
            data-parent="291" data-path="291"
            data-target="#modal-subject"></span>

        </div>
        <div
          class="btn edit-folder-action mr-2 d-flex align-items-center">
          <span data-toggle="modal"
            data-target="#modal-edit-topic" data-id="291"
            data-name="Lập trình di động" data-path
            class="fas fa-edit fa-xs "></span>
        </div>
        <div
          class=" btn delete-folder-action d-flex align-items-center">
          <span item-id="291"
            item-name="Lập trình di động" data-path="291"
            class="fas fa-trash-alt fa-xs "></span>
        </div>
      </div>

    </div>
    <!-- sub-folder && action  -->
     ${ node.subfolder.length>0? generateSubFolder(node) :"" }
  </li>`
  return content
}
function generateSubFolder(data) {

    console.log(data.level+"----")
    var allSubFolderContent= data.subfolder.map((node) => {

        return generateFolder(node)
    }).join("");
  var content = `    <div class="collapse  tree-level-${data.level+1}" id="collapse${data.id}">
                       <ul>
                       ${allSubFolderContent}
                     </ul>
                     </div>`

  return content;
}
async function getAllFilesByFolderId(folderId){
  var listFiles= new Array();
   await fetch(`./api/file/getAllFileByFolderId/${folderId}`).then(res=>res.json())
    .then(data=>{
      listFiles=data
    })
    .catch(err=>console.log("Lỗi khi lấy file: "+err))
    return listFiles;
}
 function generateFilesToUI(data){
   onLoadingFile(false)
  var  gridFiles= document.querySelector("#gridFiles")
  var listFiles= document.querySelector("#listFiles > table > tbody")
      var gridContent=null
      var listContent=null
      if(data.length===0){
         
          gridContent=` <div class="card d-flex container " 
          style="min-width: 40vh;
         max-width: 60vh;
         margin-top: 25vh;" >
           <div class="card-body">
             <h5 class="card-title h3 fw-bold">
               <img src="/public/img/icon/folder-empty.png" class="card-img-top" alt="Thư mục" style="width: 10vh;" > Thư mục trống</h5>
           </div>
         </div>`
         listContent=`<tr>
         <td>Trống</td>
         <td>Trống</td>
         <td>Trống</td>
         </tr>`
         gridFiles.innerHTML=gridContent
         listFiles.innerHTML=listContent
       
      }else{
    
        gridContent= data.map(file=>{
          var item= `<li>
          <div role="button" onclick="clickFileGridLayout(${file.id},this)" class="card grid-layout-file-item border-primary ml-5" style="width: 13rem;height: 13rem;">
            <div class="icon d-flex justify-content-center h-80">
              <div class="img-icon pt-5 ">
                <img  src="${file.image_category}" width="70px" height="70px" alt="icon ${file.name_category}">
              </div>
            </div>
            <div class="card-body">
  
              <p class="card-text text-center">${file.name}</p>
  
            </div>
          </div>
        </li>`
        return item;
        }).join("")
         listContent= data.map(file=>{
           var item=`<tr>
      
           <td onclick="clickFileListLayout(2,this)" role="button" class="list-layout-file-item">
             <div class="d-flex">
               <div class="mr-1 d-flex align-items-center  ">
                 <img src="${file.image_category}"
                   width="14.5px" height="14.5px" alt>
               </div>
               <div>
                 <span> ${file.name} </span>
               </div>
             </div>
   
           </td>
           <td>
             ${file.size} <span>mb</span>
           </td>
           <td>
             <button
               class="border-0 d-flex justify-content-center ml-3"
               data-toggle="dropdown" aria-haspopup="true"
               aria-expanded="false">
               <div class="container"> <svg
                   aria-hidden="true" focusable="false"
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24"
                   data-testid="MoreVertOutlinedIcon"
                   class="svg-icon icon-md" height="1em"
                   width="1em">
                   <path
                     d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                 </svg></div>
   
             </button>
             <div class="dropdown-menu  "
               aria-labelledby="dropdownMenuButton">
               <div class="dropdown-item  p-0" href="#">
                 <form action="#">
                   <button
                     class="d-block w-100 border-0 btn "> <i
                       class="fa fa-upload"
                       aria-hidden="true"></i>
                     <span> Upload</span></button>
                 </form>
   
               </div>
               <div role="button" class="dropdown-item"
                 href="#">
                 <i class="fa fa-eye" aria-hidden="true"></i>
                 <span>View</span>
               </div>
               <div role="button" class="dropdown-item"
                 href="#">
                 <i class="fa fa-download" aria-hidden="true"></i>
                 <span> Dowload</span>
               </div>
               <div role="button" class="dropdown-item"
                 href="#">
                 <i class="fas fa-edit    "></i>
                 <span> Edit</span>
               </div>
               <div role="button" class="dropdown-item"
                 href="#">
                 <i class="fas fa-copy    "></i>
                 <span> Copy</span>
               </div>
               <div role="button" class="dropdown-item"
                 href="#">
                 <img
                   src="public/img/icon/folder_move_to_icon.png"
                   width="16px" height="16px" alt>
                 <span>Move</span>
               </div>
               <div role="button" class="dropdown-item"
                 href="#">
                 <img
                   src="public/img/icon/icons8-rename-50.png"
                   width="16px" height="16px" alt>
                 <span>Rename</span>
               </div>
               <div role="button" class="dropdown-item"
                 href="#">
                 <i class="fa fa-trash" aria-hidden="true"></i>
                 <span>Delete</span>
               </div>
               <div role="button" class="dropdown-item"
                 href="#">
                 <i class="fa fa-share" aria-hidden="true"></i>
                 <span>Share</span>
               </div>
             </div>
           </td>
         </tr>`
         return item;
        }).join("")
        gridFiles.innerHTML=gridContent
        listFiles.innerHTML=listContent
      
      }
   
      return
     

 }
 function onLoadingFile(show){
   var loadingDiv= document.querySelector("#loading")
   var gridFile= document.querySelector("#gridFiles")
   var listFile= document.querySelector("#listFiles  ")
   if(show){
     loadingDiv.classList.remove('d-none')
     loadingDiv.classList.add('d-block')
     gridFile.classList.remove('d-flex')
     gridFile.style.display="none"
     listFile.classList.remove('d-flex')
       listFile.style.display="none"
   }else{
    loadingDiv.classList.remove('d-block')
    loadingDiv.classList.add('d-none')
   //
   gridFile.style.display="block"
   listFile.style.display="block"
   gridFile.classList.add('d-flex')
   listFile.classList.add('d-flex')

   }
   
   
 }
