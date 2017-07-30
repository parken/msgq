const express = require('express');

const router = express.Router();
const controller = require('./routes.controller');

import oauth from '../../components/oauth/auth';

router.get('/', oauth, controller.index);
router.get('/:id', oauth, controller.show);
router.post('/', oauth, controller.create);
router.post('/:id', oauth, controller.update);
router.put('/:id', oauth, controller.update);
router.post('/:id', oauth, controller.destroy);

module.exports = router;
