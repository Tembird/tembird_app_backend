// route/feedback_route.js

const express = require('express');
const router = express.Router();
const Root = require('../config/root');
const FeedbackController = require('../controller/feedback_controller');

router.post('', Root.authentication, FeedbackController.create);

module.exports = router;