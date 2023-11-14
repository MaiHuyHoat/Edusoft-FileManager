const conn = require("../database/connect_database");

class File {
    constructor(id, name, path, size, folder_id, file_category_id, user_id, created, updated, deleted) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.size = size;
        this.folder_id = folder_id;
        this.file_category_id = file_category_id;
        this.user_id = user_id;
        this.created = created;
        this.updated = updated;
        this.deleted = deleted;
    }

    getFolder() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM folder WHERE id=${this.folder_id}`;
            conn.query(sql, (err, rs) => {
                if (err) {
                    reject("Không lấy được thư mục");
                } else {
                    resolve(rs);
                }
            });
        });
    }

     getCategory() {
        if (this.file_category_id === null) {
            return Promise.resolve(null);
        } else {
            return new Promise((resolve, reject) => {
                let sql = `SELECT * FROM file_category WHERE id=${this.file_category_id}`;
                conn.query(sql, (err, rs) => {
                    if (err) {
                        reject("Không lấy được danh mục tệp");
                    } else {
                        resolve(rs);
                    }
                });
            });
        }
    }

    getOwner() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM user WHERE id='${this.user_id}'`;
            conn.query(sql, (err, rs) => {
                if (err) {
                    reject("Không lấy được người dùng");
                } else {
                    resolve(rs);
                }
            });
        });
    }
     async convertToJSON() {
        return {
            id: this.id,
            name: this.name,
            path: this.path,
            size: this.size,
            folder_id: this.folder_id,
            file_category_id: this.file_category_id,
            category: await this.getCategory(),
            user_id: this.user_id,
            owner:await this.getOwner(),
            created: this.created,
            updated: this.updated,
            deleted: this.deleted
        };
    }
    
}

module.exports = File;
