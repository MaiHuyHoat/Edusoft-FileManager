const conn = require("../database/connect_database");

class ShareFile {
    constructor(id, file_id, user_id) {
        this.id = id;
        this.file_id = file_id;
        this.user_id = user_id;
    }

    getFile() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM file WHERE id=${this.file_id}`;
            conn.query(sql, (err, rs) => {
                if (err) {
                    reject("Không lấy được tệp được chia sẻ");
                } else {
                    resolve(rs);
                }
            });
        });
    }

    getUser() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM user WHERE id='${this.user_id}'`;
            conn.query(sql, (err, rs) => {
                if (err) {
                    reject("Không lấy được người dùng chia sẻ");
                } else {
                    resolve(rs);
                }
            });
        });
    }
}

module.exports = ShareFile;
