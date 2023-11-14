const conn = require("../database/connect_database");

class FileCategory {
    constructor(id, name,image) {
        this.id = id;
        this.name = name;
        this.image=image
    }

    getFilesInCategory() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM file WHERE file_category_id=${this.id}`;
            conn.query(sql, (err, rs) => {
                if (err) {
                    reject("Không lấy được các tệp trong danh mục này");
                } else {
                    resolve(rs);
                }
            });
        });
    }
}

module.exports = FileCategory;
