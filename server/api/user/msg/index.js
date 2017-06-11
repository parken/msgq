const express = require('express');
const controller = require('./msg.controller');

const router = express.Router();

router.get('/:id/msgs', controller.index);
router.get('/:id/msgs/:id', controller.show);
router.post('/:id/msgs', controller.create);
router.post('/:id/msgs/:id', controller.update);

module.exports = router;
