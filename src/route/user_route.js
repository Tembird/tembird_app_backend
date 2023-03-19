// route/user_route.js

const express = require('express');
const router = express.Router();
const UserController = require('../controller/user_controller');

router.post('/sign-up', UserController.signUp);

module.exports = router;