// route/user_route.js

const express = require('express');
const router = express.Router();
const Root = require('../config/root');
const UserController = require('../controller/user_controller');

router.post('/sign-up', UserController.signUp);
router.post('/login', UserController.login);
router.post('/refresh', UserController.updateAccessToken);
router.put('/username', Root.authentication, UserController.updateUsername);
router.put('/update-password', Root.authentication, UserController.updatePassword);

module.exports = router;