import angular from 'angular';
import uiRouter from 'angular-ui-router';
import DeliveryReportComponent from './delivery-report.component';
import routing from './delivery-report.routes';

export default angular
  .module('msgQueApp.delivery-report', [uiRouter])
  .config(routing)
  .component('deliveryReport', DeliveryReportComponent)
  .name;
