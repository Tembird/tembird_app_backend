// route/color_route.js

const express = require('express');
const router = express.Router();
const Root = require('../config/root');
const ColorController = require('../controller/color_controller');

router.get('', Root.authentication, ColorController.read);

module.exports = router;