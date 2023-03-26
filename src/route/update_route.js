// route/update_route.js

const express = require('express');
const router = express.Router();
const Root = require('../config/root');
const UpdateController = require('../controller/update_controller');

router.get('', UpdateController.read);

module.exports = router;