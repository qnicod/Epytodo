const Todo = require('./todos.query.js');

exports.create_task = (req, res) => {
    console.log('Bloqué');
    if (!req.body) {
        res.status(400).json({
            msg: "Content can not be empty!"
        });
    }
    const new_task = new Todo({
        title: req.body.title,
        description: req.body.description,
        due_time: req.body.due_time,
        user_id: req.body.user_id,
        status: req.body.status
    });
    Todo.createTask(new_task, (err) => {
        if (err)
            res.status(400).send({
                msg: "Invalid creditentials"
            });
        else
            res.status(201).json(new_task);
    });
};

exports.findAllTodo = (req, res) => {
    Todo.getAll(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            msg: "Not found"
          });
        } else {
          res.status(500).json({
            msg: "Error retrieving User with id " + req.params.id
          });
        }
      } else res.status(200).json(data);
    });
};

exports.updateTodo = (req, res) => {
    if (!req.body) {
      res.status(400).json({
        msg: "Empty"
      });
    }
    Todo.updateById(req.params.id, new Todo({
        title: req.body.title,
        description: req.body.description,
        due_time: req.body.due_time,
        user_id: req.body.user_id,
        status: req.body.status
      }), (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).json({
                msg: "Not found"
              });
            } else {
              res.status(500).json({
                msg: "Error retrieving Task with id " + req.params.id
              });
            }
          } else 
            res.status(200).json(data);
        }
      );
};
  


exports.deleteTodo = (req, res) => {
    Todo.remove(req.params.id, (err) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            msg: "Not found"
          });
        } else {
          res.status(500).send({
            msg: "Error retrieving User with id " + req.params.id
          });
        }
      } else
        res.json({ msg: "successfully deleted record number: " + req.params.id })
    });
}

exports.findOneIdTodo = (req, res) => {
    Todo.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            msg: "Not found"
          });
        } else {
          res.status(500).json({
            msg: "Error retrieving Todo with id " + req.params.id
          });
        }
      } else res.json(data);
    });
  };