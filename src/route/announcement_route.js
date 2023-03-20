// route/announcement_route.js

const express = require('express');
const router = express.Router();
const Root = require('../config/root');
const AnnouncementController = require('../controller/announcement_controller');

router.get('', Root.authentication, AnnouncementController.read);

module.exports = router;