const express = require('express');
const controller = require('./sms.controller');

import oauth from '../../components/oauth/auth';

const router = express.Router();

router.get('/excel', controller.createExcel);
router.get('/:id', controller.show);
router.post('/', oauth, controller.create);

module.exports = router;
