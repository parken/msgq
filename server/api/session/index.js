const express = require('express');

const router = express.Router();
const controller = require('./session.controller');

router.get('/', controller.index);

module.exports = router;
