import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewSenderIdComponent from './new-senderId/new-senderId.controller';
import ListSenderIdComponent from './list-senderId/list-senderId.controller';

import routing from './senderId.routes';

export default angular
  .module('msgQueApp.SenderId', [uiRouter])
  .component('listSenderId', ListSenderIdComponent)
  .component('newSenderId', NewSenderIdComponent)
  .config(routing)
  .name;
