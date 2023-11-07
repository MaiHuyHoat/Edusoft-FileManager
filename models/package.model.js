const conn = require("../database/connect_database");

class Package {
    constructor(id, name, storage_limit, price, description) {
        this.id = id;
        this.name = name;
        this.storage_limit = storage_limit;
        this.price = price;
        this.description = description;
    }

    getUsersWithPackage() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM user WHERE package_id=${this.id}`;
            conn.query(sql, (err, rs) => {
                if (err) {
                    reject("Không lấy được người dùng có gói này");
                } else {
                    resolve(rs);
                }
            });
        });
    }
}

module.exports = Package;
