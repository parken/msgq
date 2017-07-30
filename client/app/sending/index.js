import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewSendingComponent from './new-sending/new-sending.controller';
import ListSendingComponent from './list-sending/list-sending.controller';

import routing from './sending.routes';

export default angular
  .module('msgQueApp.Sending', [uiRouter])
  .component('listSending', ListSendingComponent)
  .component('newSending', NewSendingComponent)
  .config(routing)
  .name;
