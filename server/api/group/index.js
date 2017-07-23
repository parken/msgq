const express = require('express');
const controller = require('./group.controller');

import oauth from '../../components/oauth/auth';

const router = express.Router();

router.get('/', oauth, controller.index);
router.post('/', oauth, controller.create);
router.post('/:name/email/:email', oauth, controller.addEmailToGroup);

module.exports = router;
