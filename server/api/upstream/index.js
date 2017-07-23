import express from 'express';

import oauth from '../../components/oauth/auth';
import * as controller from './upstream.controller';

const router = express.Router();

router.post('/:id/plan', oauth, controller.createPlan);

module.exports = router;
