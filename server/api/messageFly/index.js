const express = require('express');
const controller = require('./messageFly.controller');

import oauth from '../../components/oauth/auth';

const router = express.Router();

router.get('/', oauth, controller.index);

module.exports = router;
