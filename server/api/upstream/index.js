const express = require('express');
const controller = require('./upstream.controller');
import oauth from '../../components/oauth/auth';

const router = express.Router();

router.post('/:id/plan', oauth(), controller.createPlan);

module.exports = router;
