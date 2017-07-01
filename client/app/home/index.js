import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './home.routes';
import HomeList from './home-list';
import SendSms from './send-sms';
import DeliveryReport from './delivery-report';

export default angular
  .module('msgQueApp.home', [
    uiRouter, HomeList, SendSms, DeliveryReport,
  ])
  .config(routing)
  .name;
