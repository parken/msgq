const express = require('express');
const controller = require('./bulk.controller');
import oauth from '../../components/oauth/auth';

const router = express.Router();

router.post('/sms', oauth(), controller.bulkSms);
module.exports = router;
