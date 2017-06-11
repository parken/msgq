const express = require('express');
const controller = require('./auth.controller');
import { auth } from './../../components/auth';
import oauth from '../../components/oauthjs/auth';

const router = express.Router();

router.get('/', auth, controller.index);

module.exports = router;
