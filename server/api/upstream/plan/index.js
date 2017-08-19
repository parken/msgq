import express from 'express';

import * as controller from '../../upstreamPlan/upstreamPlan.controller';

const router = express.Router();

router.get('/:upstreamId/plans', controller.index);
router.post('/:id/plans', controller.create);

module.exports = router;
