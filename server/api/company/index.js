const express = require('express');
const controller = require('./company.controller');

const router = express.Router();

router.get('/', controller.show);
router.get('/:id', controller.show);

module.exports = router;
