import angular from 'angular';
import OTPService from './otp.service';

export default angular
  .module('msgQueApp.otp', [])
  .service('OTP', OTPService)
  .name;
