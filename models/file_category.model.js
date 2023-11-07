const conn = require("../database/connect_database");

class FileCategory {
    constructor(id, name) {
        this.id = id;
        this.name = name;
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
