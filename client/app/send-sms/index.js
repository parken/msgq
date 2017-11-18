import angular from 'angular';
import uiRouter from 'angular-ui-router';
import SendSmsComponent from './send-sms.component';
import ScheduleSms from '../../components/schedule-sms';
import toaster from 'angularjs-toaster';
import routing from './send-sms.routes';

export default angular
  .module('msgQueApp.send-sms', [uiRouter, ScheduleSms, toaster])
  .config(routing)
  .component('sendSms', SendSmsComponent)
  .name;
