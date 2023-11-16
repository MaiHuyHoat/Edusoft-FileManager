
Dropzone.options.uploadDropzone = {
  paramName: "file",
  method:"post",
  url:"/api/file/upload",
  maxFilesize: 2,
  
  accept: function(file, done) {
    if (file.name == "justinbieber.jpg") {
      done("Naha, you don't.");
    } else {
      done();
    }
  },
  init: function() {
    this.on("success", function(file, response) {
      // Xử lý khi tải lên thành công
      console.log("Upload success:", response);
      
    });

    this.on("error", function(file, response,) {
      // Xử lý khi có lỗi xảy ra
      console.error("Upload error:", response);
 
    });

    this.on("sending", function(file, xhr, formData) {
      // Thêm bất kỳ dữ liệu nào bạn muốn gửi đi cùng với file
      formData.append("idFolder",currentFolderId);
    });
  }
};
