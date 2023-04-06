// route/todo_label_route.js

const express = require('express');
const router = express.Router();
const Root = require('../config/root');
const TodoLabelController = require('../controller/todo_label_controller');

router.get('', Root.authentication, TodoLabelController.readAll);
router.get('/:id', Root.authentication, TodoLabelController.read);
router.post('', Root.authentication, TodoLabelController.create);
router.put('', Root.authentication, TodoLabelController.update);
router.delete('/:id', Root.authentication, TodoLabelController.delete);

module.exports = router;