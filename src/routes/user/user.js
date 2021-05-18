const User = require("./user.query.js");
const bcrypt = require('bcryptjs');
const saltRounds = 5;

exports.findAll = (req, res) => {
  User.getAll(req.params.id, (err, data) => {
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

exports.findOneId = (req, res) => {
  User.findById(req.params.id, (err, data) => {
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

exports.findOneEmail = (req, res) => {
  User.findByEmail(req.params.email, (err, data) => {
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

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      msg: "Empty"
    });
  }
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    User.updateById(req.params.id, new User({
      email: req.body.email,
      password: hash,
      firstname: req.body.firstname,
      name: req.body.name
    }), (err, data) => {
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
        } else 
          res.status(200).json(data);
      }
    );
  });
};

exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          msg: "Not found"
        });
      } else {
        res.status(500).send({
          msg: "Error retrieving User with id " + req.params.userId
        });
      }
    } else
      res.status(200).json({ msg: "successfully deleted record number: " + req.params.id })
  });
};

exports.findAllUserTask = (req, res) => {
  User.findByTask((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          msg: "Not found"
        });
      } else res.status(200).json(data);
    };
  });
};