const express = require('express');
const controller = require('./senderId.controller');
import oauth from '../../components/oauth/auth';

const router = express.Router();

router.post('/', oauth(), controller.create);
router.delete('/:id', oauth(), controller.deleteSenderId);
module.exports = router;
