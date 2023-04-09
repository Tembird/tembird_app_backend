// route/todo_route.js

const express = require('express');
const router = express.Router();
const Root = require('../config/root');
const TodoController = require('../controller/todo_controller');

router.post('', Root.authentication, TodoController.create);
router.put('', Root.authentication, TodoController.update);
router.delete('/:tid', Root.authentication, TodoController.delete);

module.exports = router;