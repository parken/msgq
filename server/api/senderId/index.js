const express = require('express');
const controller = require('./senderId.controller');

import oauth from '../../components/oauth/auth';

const router = express.Router();

router.post('/', oauth(), controller.create);
router.get('/', oauth(), controller.index);
router.get('/xls', controller.createXls);
router.get('/:id', oauth(), controller.show);
router.put('/:id/block', oauth(), controller.block);
router.put('/:id/approve', oauth(), controller.approve);
router.delete('/:id', oauth(), controller.deleteSenderId);
module.exports = router;
