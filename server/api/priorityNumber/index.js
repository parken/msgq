const express = require('express');
const controller = require('./priorityNumber.controller');

const router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/:id', controller.update);
router.put('/:id', controller.update);
router.post('/:id', controller.destroy);

module.exports = router;
