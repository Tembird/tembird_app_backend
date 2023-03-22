// route/schedule_route.js

const express = require('express');
const router = express.Router();
const Root = require('../config/root');
const ScheduleController = require('../controller/schedule_controller');

router.get('/:date', Root.authentication, ScheduleController.read);
router.post('', Root.authentication, ScheduleController.create);
router.put('', Root.authentication, ScheduleController.update);
router.delete( '', Root.authentication, ScheduleController.delete);

module.exports = router;