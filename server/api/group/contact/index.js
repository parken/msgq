const express = require('express');
const controller = require('../../contact/contact.controller');

import oauth from '../../../components/oauth/auth';

const router = express.Router();

router.post('/sync', oauth, controller.syncContact);

router.get('/:groupId/contacts', oauth, controller.index);

module.exports = router;
