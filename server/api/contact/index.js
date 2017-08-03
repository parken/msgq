const express = require('express');
const controller = require('./contact.controller');

import oauth from '../../components/oauth/auth';

const router = express.Router();

router.post('/sync', oauth, controller.syncContact);

module.exports = router;
