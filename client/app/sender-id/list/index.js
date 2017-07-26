import angular from 'angular';
import uiRouter from 'angular-ui-router';
import SenderIdListComponent from './list.component';
import AddSenderId from './add-sender-id';
import routing from './list.routes';

export default angular
  .module('msgQueApp.senderId.list', [uiRouter, AddSenderId])
  .config(routing)
  .component('senderIdList', SenderIdListComponent)
  .name;
