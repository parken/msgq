import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewMessageComponent from './new-message/new-message.controller';
import ListMessageComponent from './list-message/list-message.controller';
import ViewMessageComponent from './view-message/view-message.controller';

import routing from './message.routes';

export default angular
  .module('msgQueApp.Message', [uiRouter])
  .component('listMessage', ListMessageComponent)
  .component('newMessage', NewMessageComponent)
  .component('viewMessage', ViewMessageComponent)
  .config(routing)
  .name;
