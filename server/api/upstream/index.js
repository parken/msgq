import express from 'express';

import * as controller from './upstream.controller';

const router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);

router.post('/', controller.create);
router.post('/:id/activate', controller.activate);
router.post('/:id', controller.update);
router.put('/:id', controller.update);
router.post('/:id', controller.destroy);

module.exports = router;
