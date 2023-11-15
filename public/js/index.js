


 async function clickFolder(treeItem) {
  changeIArrow(treeItem);
  var folderId= treeItem.getAttribute("folderId")
  var listFiles= await getAllFilesByFolderId(folderId)
  generateFilesToUI(listFiles)
}
function clickFileListLayout(idFile, file) {
  var AllFileTbody = document.querySelector("#listFiles");
  var allFile = AllFileTbody.querySelectorAll("tr");
  allFile.forEach((tr) => {
    var tdFile = tr.querySelector("td");
    if (
      tdFile !== file &&
      tdFile.parentElement.classList.contains("active-file")
    ) {
      changeShowActionWithFile(tdFile);
    }
  });

  changeShowActionWithFile(file);
}
function clickFileGridLayout(idFile, file) {
  var AllFileTbody = document.querySelector("#gridFiles");
  var allFile = AllFileTbody.querySelectorAll("li .grid-layout-file-item");

  allFile.forEach((item) => {
    var tdFile = item;
    if (tdFile !== file && tdFile.classList.contains("active-file")) {
      changeShowActionWithFile(tdFile);
    }
  });

  changeShowActionWithFile(file);
}

function changeShowActionWithFile(file) {
  var divFile = file.parentElement;

  var job = new Array();
  var viewBtn = document.querySelector("#viewFile");
  job.push(viewBtn);
  var dowloadBtn = document.querySelector("#dowloadFile");
  job.push(dowloadBtn);
  var editBtn = document.querySelector("#editFile");
  job.push(editBtn);
  var moveBtn = document.querySelector("#moveFile");
  job.push(moveBtn);
  var copyBtn = document.querySelector("#copyFile");
  job.push(copyBtn);
  var renameBtn = document.querySelector("#renameFile");
  job.push(renameBtn);
  var deleteBtn = document.querySelector("#deleteFile");
  job.push(deleteBtn);
  var shareBtn = document.querySelector("#shareFile");
  job.push(shareBtn);
  job.forEach((e) => {
    if (e.classList.contains("d-none")) {
      e.classList.remove("d-none");
      e.classList.add("d-block");
    } else {
      e.classList.remove("d-block");
      e.classList.add("d-none");
    }
  });

  //list layout
  if (file.classList.contains("list-layout-file-item")) {
    if (!divFile.classList.contains("active-file")) {
      divFile.classList.add("active-file");
    } else {
      divFile.classList.remove("active-file");
    }
  }

  // grid layout

  if (file.classList.contains("grid-layout-file-item")) {
    if (!file.classList.contains("active-file")) {
      file.classList.add("active-file")
      file.classList.add("border-primary");
    } else {
      file.classList.remove("active-file")
      file.classList.remove("border-primary");
      
    }
  }
}
function changeIArrow(folder) {
  var angleArrow = folder.querySelector("i");

  if (angleArrow.classList.contains("fa-angle-right")) {
    angleArrow.classList.remove("fa-angle-right");
    angleArrow.classList.add("fa-angle-down");
  } else {
    angleArrow.classList.remove("fa-angle-down");
    angleArrow.classList.add("fa-angle-right");
  }

  var img = folder.querySelector("img");
  var imgSrc = img.getAttribute("src");

  if (imgSrc.includes("folder.png")) {
    img.setAttribute("src", "/public/img/icon/folder_open.png");
    img.setAttribute("width", "18px");
    img.setAttribute("height", "18px");
  } else {
    img.setAttribute("src", "/public/img/icon/folder.png");
    img.setAttribute("width", "14.5px");
    img.setAttribute("height", "14.5px");
  }
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
      var  gridFiles= document.querySelector("#gridFiles")
      var listFiles= document.querySelector("#listFiles")
      var gridContent= data.map(file=>{
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
      var listContent= data.map(file=>{
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
