const express = require('express');
const controller = require('./user.controller');
import oauth from '../../components/oauth/auth';

const router = express.Router();

router.get('/', oauth(), controller.index);

router.get('/wStates', oauth(), controller.wStates);
router.get('/me', oauth(), controller.me);
router.get('/duplicate', controller.duplicate);
router.get('/checkExists', controller.checkExists);
router.get('/uuid/:uuid', controller.showUuid);
router.get('/:id', oauth(), controller.show);
router.get('/:id/sendLogin', oauth(), controller.sendLogin);

router.post('/', oauth(), controller.create);
router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/otpLogin', controller.otpLogin);
router.post('/otp', controller.otpSend);
router.post('/otpVerify', controller.otpVerify);
router.post('/:id', oauth(), controller.update);
router.post('/:id/selling', oauth(), controller.addSelling);
router.post('/:id/sellingRoot', oauth(), controller.addSellingRootUser);

router.put('/', oauth(), controller.update);
router.put('/password', controller.passwordChange);

module.exports = router;
