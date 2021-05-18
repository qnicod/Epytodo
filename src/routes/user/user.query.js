const sql = require("../../config/db.js");
var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');

'user strict';
const User = function(user) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.firstname = user.firstname;
    this.name = user.name;
    this.created_at = formatted;
};

User.create = (newUser, result) => {
    sql.query(`INSERT INTO user SET ?`, newUser, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        console.log({ id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findById = (id, result) => {
    sql.query(`SELECT * FROM user WHERE id = ?`, id, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if (!res.length) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("found user: ", res[0]);
        result(null, res[0]);
    });
};

User.findByEmail = (email, result) => {
    sql.query(`SELECT * FROM user WHERE email = ?`, email, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if (!res.length) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("found user: ", res[0]);
        result(null, res[0]);
    });
};

User.findOne = (email, password) => {
    sql.query(`SELECT * FROM user WHERE email = ?`, [email], (err) => {
        if (err) {
            console.password("Error: ", err)
        }
    });
}


User.getAll = (id, result) => {
    sql.query(`SELECT * FROM user`, (err, res) => {
        if (err) {
            console.log("Error ", err);
            result(null, err);
            return;
        }
        console.log("customers: ", res);
        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    sql.query(
        `UPDATE user SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?`,
        [user.email, user.password, user.firstname, user.name, id],
        (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated customer: ", { id: id, ...user });
            result(null, { id: id, ...user});
        }
    );
};

User.remove = (id, result) => {
    sql.query(`DELETE FROM user WHERE id = ?`, id, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted customer with id:", id);
        result(null, res);
    });
};

User.findByTask = (result) => {
    sql.query(`SELECT * FROM todo`, (err, res) => {
        if (err) {
            console.log("Error ", err);
            result(null, err);
            return;
        }
        console.log("task from users: ", res);
        result(null, res);
    });
};

module.exports = User;