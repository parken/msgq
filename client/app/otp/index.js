import angular from 'angular';
import uiRouter from 'angular-ui-router';
import OTPComponent from './otp.controller';
import routing from './otp.routes';

export default angular
  .module('msgQueApp.otp', [uiRouter])
  .config(routing)
  .component('otp', OTPComponent)
  .name;
