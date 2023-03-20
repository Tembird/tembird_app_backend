// route/docs_route.js

const express = require('express');
const router = express.Router();
const Root = require('../config/root');
const DocsController = require('../controller/docs_controller');

router.get('/terms', Root.authentication, DocsController.readTerms);

module.exports = router;