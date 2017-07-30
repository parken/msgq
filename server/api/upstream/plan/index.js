import express from 'express';

import oauth from '../../../components/oauth/auth';
import * as controller from '../../upstreamPlan/upstreamPlan.controller';

const router = express.Router();

router.get('/:upstreamId/plans', oauth, controller.index);

module.exports = router;
