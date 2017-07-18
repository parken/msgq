const express = require('express');
const controller = require('./company.controller');

const router = express.Router();

router.get('/', controller.show);

module.exports = router;
