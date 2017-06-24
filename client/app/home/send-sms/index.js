import angular from 'angular';
import uiRouter from 'angular-ui-router';
import SendSmsComponent from './send-sms.component';
import routing from './send-sms.routes';

export default angular
  .module('msgQueApp.send-sms', [uiRouter])
  .config(routing)
  .component('sendSms', SendSmsComponent)
  .name;
