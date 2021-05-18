var sql = require("../../config/db.js");
var User = require ("../user/user.query.js");
var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');

const Todo = function(todo) {
    this.title = todo.title;
    this.description = todo.description;
    this.created_at = formatted;
    this.due_time = todo.due_time;
    this.status = todo.status;
    this.user_id = todo.user_id;
};

Todo.createTask = (newTask, result) => {
    sql.query(`INSERT INTO todo SET ?`, newTask, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        console.log({ id: res.insertId, ...newTask});
        result(null, {id: res.insertId, ...newTask});
    })
}

Todo.getAll = (id, result) => {
    sql.query(`SELECT * FROM todo`, (err, res) => {
        if (err) {
            console.log("Error ", err);
            result(null, err);
            return;
        }
        console.log("Tasks: ", res);
        result(null, res);
    });
};

Todo.updateById = (id, todo, result) => {
    sql.query(
        `UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?`,
        [todo.title, todo.description, todo.due_time, todo.user_id, todo.status, id],
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
            console.log("updated task: ", { id: id, ...todo });
            result(null, { id: id, ...todo });
        }
    );
};

Todo.remove = (id, result) => {
    sql.query(`DELETE FROM todo WHERE id = ?`, id, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted task with id:", id);
        result(null, res);
    });
};

Todo.findById = (id, result) => {
    sql.query(`SELECT * FROM todo WHERE id = ?`, id, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if (!res.length) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("found task: ", res[0]);
        result(null, res[0]);
    });
};

module.exports = Todo;