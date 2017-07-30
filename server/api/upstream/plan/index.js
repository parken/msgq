import express from 'express';

import oauth from '../../../components/oauth/auth';
import * as controller from './plan.controller';

const router = express.Router();

router.get('/', oauth, controller.index);
router.get('/:id', oauth, controller.show);

router.post('/', oauth, controller.create);
router.post('/:id/activate', oauth, controller.activate);
router.post('/:id', oauth, controller.update);
router.put('/:id', oauth, controller.update);
router.post('/:id', oauth, controller.destroy);
router.post('/:id/plan', oauth, controller.createPlan);

module.exports = router;
