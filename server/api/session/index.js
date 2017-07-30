const express = require('express');

const router = express.Router();
const controller = require('./session.controller');

import oauth from '../../components/oauth/auth';

router.get('/', oauth, controller.index);

module.exports = router;
