// route/todo_route.js

const express = require('express');
const router = express.Router();
const Root = require('../config/root');
const TodoController = require('../controller/todo_controller');

router.put('', Root.authentication, TodoController.update);

module.exports = router;