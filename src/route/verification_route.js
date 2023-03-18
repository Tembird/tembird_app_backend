// route/verification_route.js

const express = require('express');
const router = express.Router();
const VerificationController = require('../controller/verification_controller');

router.post('/require', VerificationController.sendEmailVerificationEmail);
router.post('/check', VerificationController.checkEmailVerificationEmail);

module.exports = router;