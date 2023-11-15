
document.addEventListener("DOMContentLoaded", () => {
  getData();
});

function getData() {
  var userName = "nmhuy";
  fetch(`./api/folder/getAllByUserName/${userName}`, {
    method: "get",
    "content-type": "application/json",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)

      convertDataFolder(data, data[0], 0);
      // lấy root của cây thư mục
      var root = data[0];
      console.log(root);
      generateDataToUI(root)
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
