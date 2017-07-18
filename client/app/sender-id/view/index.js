import angular from 'angular';
import uiRouter from 'angular-ui-router';
import SenderIdViewComponent from './view.component';
import routing from './view.routes';

export default angular
  .module('msgQueApp.senderId.view', [uiRouter])
  .config(routing)
  .component('senderIdView', SenderIdViewComponent)
  .name;
