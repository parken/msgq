const express = require('express');
const controller = require('./company.controller');
import oauth from '../../components/oauth/auth';

const router = express.Router();

router.get('/', controller.show);

module.exports = router;
