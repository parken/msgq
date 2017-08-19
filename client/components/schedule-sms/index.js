import angular from 'angular';
import ScheduleSmsService from './schedule-sms.service';
import uiBootstrap from 'angular-ui-bootstrap';

export default angular
  .module('msgQueApp.schedule-sms', [uiBootstrap])
  .service('ScheduleSms', ScheduleSmsService)
  .name;
