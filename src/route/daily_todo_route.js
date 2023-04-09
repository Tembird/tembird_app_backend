// route/daily_todo_route.js

const express = require('express');
const router = express.Router();
const Root = require('../config/root');
const DailyTodoController = require('../controller/daily_todo_controller');

router.post('', Root.authentication, DailyTodoController.create);
router.patch('', Root.authentication, DailyTodoController.update);
router.get('/:id', Root.authentication, DailyTodoController.read);
router.get('/', Root.authentication, DailyTodoController.readByQuery);
router.delete('/:id', Root.authentication, DailyTodoController.delete);

module.exports = router;