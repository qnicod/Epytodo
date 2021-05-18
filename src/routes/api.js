const router = require("express").Router();
const auth = require('./auth/auth.js');
const user = require('./user/user.js');
const todo = require('./todos/todos.js');

router.post('/register', auth.register);
router.get('/user', user.findAll);
router.delete('/user/:id', user.delete);
router.get('/user/:id', user.findOneId);
router.put('/user/:id', user.update);
router.get('/user/:email', user.findOneEmail);
router.get('/todo', todo.findAllTodo);
router.get('/todo/:id', todo.findOneIdTodo);
router.post('/todo', todo.create_task);
router.put('/todo/:id', todo.updateTodo);
router.delete('/todo/:id', todo.deleteTodo);
router.post('/login', auth.login);
router.get('/user/todos', user.findAllUserTask);

module.exports = router;
