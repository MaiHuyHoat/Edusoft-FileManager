function clickFolder(treeItem){
    changeIArrow(treeItem);
    console.log("thực hiện hàm fetch để lấy file, dữ liệu có trong thư mục ")
}
function clickFile(idFile,file){
  var AllFileTbody=document.querySelector("#AllFile1");
   var allFile=AllFileTbody.querySelectorAll("tr")
   allFile.forEach(tr=>{
    var tdFile=tr.querySelector("td");
    if(tdFile!==file && tdFile.parentElement.classList.contains("border-file")) {
        changeShowActionWithFile(tdFile)
       
    }
   })

 changeShowActionWithFile(file)
}
function changeShowActionWithFile(file){
    var divFile=file.parentElement;
   
    var job= new Array();
    var  viewBtn=document.querySelector("#viewFile");
    job.push(viewBtn);
    var dowloadBtn=document.querySelector("#dowloadFile");
    job.push(dowloadBtn)
    var editBtn=document.querySelector("#editFile")
    job.push(editBtn)
    var moveBtn= document.querySelector("#moveFile")
    job.push(moveBtn)
    var copyBtn= document.querySelector("#copyFile");
    job.push(copyBtn)
    var renameBtn=document.querySelector("#renameFile")
    job.push(renameBtn)
    var deleteBtn=document.querySelector("#deleteFile")
    job.push(deleteBtn)
    var shareBtn=document.querySelector("#shareFile")
    job.push(shareBtn)
    job.forEach(e=>{
      if(e.classList.contains('d-none')){
        e.classList.remove('d-none')
        e.classList.add("d-block")
      }else{
        e.classList.remove("d-block")
        e.classList.add('d-none')
       
      }
    })
    if(!divFile.classList.contains("border-file")){
        divFile.classList.add("border-file")
    }
    else{
        divFile.classList.remove("border-file")
    }
    
}
function changeIArrow(folder) {
  var angleArrow = folder.querySelector('i');

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
    img.setAttribute("width","18px");
    img.setAttribute("height","18px")

  } else {
    img.setAttribute("src", "/public/img/icon/folder.png");
    img.setAttribute("width","14.5px");
    img.setAttribute("height","14.5px")
  }
}
function uploadFile(){
  
}
