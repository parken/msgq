import google from './google'
const express = require('express');
const router = express.Router();

router.use('/google', google);

module.exports = router;
