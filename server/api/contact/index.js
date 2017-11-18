const express = require('express');
const controller = require('./contact.controller');

import oauth from '../../components/oauth/auth';

const router = express.Router();

router.post('/sync', oauth, controller.syncContact);

router.get('/', oauth, controller.index);
router.get('/:id', oauth, controller.show);
router.post('/', oauth, controller.create);
router.post('/:id', oauth, controller.update);
router.put('/:id', oauth, controller.update);
router.post('/:id', oauth, controller.destroy);

module.exports = router;
