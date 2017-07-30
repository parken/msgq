const express = require('express');

const router = express.Router();
const controller = require('./message.controller');

import oauth from '../../components/oauth/auth';

router.get('/', oauth, controller.index);
router.get('/:id', oauth, controller.show);

module.exports = router;
