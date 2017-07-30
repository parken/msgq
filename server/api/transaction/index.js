import express from 'express';

import oauth from '../../components/oauth/auth';
import * as controller from './transaction.controller';

const router = express.Router();

router.get('/', oauth, controller.index);

module.exports = router;
