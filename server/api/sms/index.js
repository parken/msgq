const express = require('express');
const controller = require('./sms.controller');
import oauth from '../../components/oauth/auth';

const router = express.Router();

router.post('/', oauth(), controller.bulkSms);
module.exports = router;
