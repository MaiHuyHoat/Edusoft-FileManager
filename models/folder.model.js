const conn = require("../database/connect_database");

class Folder {
    constructor(id, name, path, size, user_id, parent_id, created, updated, deleted) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.size = size;
        this.user_id = user_id;
        this.parent_id = parent_id;
        this.created = created;
        this.updated = updated;
        this.deleted = deleted;
    }

    getOwner() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM user WHERE id='${this.user_id}'`;
            conn.query(sql, (err, rs) => {
                if (err) {
                    reject("Không lấy được người dùng");
                } else {
                    resolve(rs);
                    this.user=rs;
                }
            });
        });
    }

    getSubFolder() {
        if (this.parent_id === null) {
            return Promise.resolve(null);
        } else {
            return new Promise((resolve, reject) => {
                let sql = `SELECT * FROM folder WHERE parent_id=${this.parent_id}`;
                conn.query(sql, (err, rs) => {
                    if (err) {
                        reject("Không lấy được thư mục cha");
                    } else {
                        resolve(rs);
                        this.sub_folders=rs;
                    }
                });
            });
        }
    }
}

module.exports = Folder;
