const express = require('express');

const router = express.Router();
const controller = require('./sending.controller');

import oauth from '../../components/oauth/auth';

router.get('/', oauth, controller.index);
router.post('/', oauth, controller.create);

module.exports = router;
