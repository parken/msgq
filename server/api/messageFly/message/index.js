const express = require('express');

const router = express.Router();
const controller = require('../../message/message.controller');

import oauth from '../../../components/oauth/auth';

router.get('/:messageFlyId/messages', oauth, controller.index);

module.exports = router;
