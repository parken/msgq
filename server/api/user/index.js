const express = require('express');
const controller = require('./user.controller');

import oauth from '../../components/oauth/auth';

const router = express.Router();

router.get('/', oauth, controller.index);

router.get('/me', oauth, controller.me);
router.post('/me', oauth, controller.meUpdate);
router.get('/duplicate', controller.duplicate);
router.get('/checkExists', controller.checkExists);
router.get('/uuid/:uuid', controller.showUuid);
router.get('/:id', oauth, controller.show);
router.get('/:id/sendLogin', oauth, controller.sendLogin);

router.post('/', oauth, controller.create);
router.post('/signup', controller.signup);
router.post('/endUser', oauth, controller.createEndUser);
router.post('/customer', oauth, controller.createCustomer);
router.post('/login', controller.login);
router.post('/googleLogin', controller.googleLogin);
router.post('/otpLogin', controller.otpLogin);
router.post('/otp', controller.otpSend);
router.post('/otpVerify', controller.otpVerify);
router.post('/:id', oauth, controller.update);
router.put('/:id', oauth, controller.update);
router.post('/:id/selling', oauth, controller.addSelling);
router.post('/:id/sellingRoot', oauth, controller.addSellingRootUser);

router.put('/', oauth, controller.update);
router.put('/password', controller.passwordChange);

module.exports = router;
