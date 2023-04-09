// route/daily_todo_label_route.js

const express = require('express');
const router = express.Router();
const Root = require('../config/root');
const DailyTodoLabelController = require('../controller/daily_todo_label_controller');

router.get('/:date', Root.authentication, DailyTodoLabelController.readAtDate);
router.get('/:id', Root.authentication, DailyTodoLabelController.read);
router.post('', Root.authentication, DailyTodoLabelController.create);
router.put('', Root.authentication, DailyTodoLabelController.update);
router.delete('/:id', Root.authentication, DailyTodoLabelController.delete);

module.exports = router;