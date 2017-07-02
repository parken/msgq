const express = require('express');
const controller = require('./sms.controller');
import oauth from '../../components/oauth/auth';

const router = express.Router();

router.get('/:id', controller.show);
router.post('/', controller.create);

module.exports = router;
