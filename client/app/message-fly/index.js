import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewMessageFlyComponent from './new-message-fly/new-message-fly.controller';
import ListMessageFlyComponent from './list-message-fly/list-message-fly.controller';
import ViewMessageFlyComponent from './view-message-fly/view-message-fly.controller';

import routing from './message-fly.routes';

export default angular
  .module('msgQueApp.MessageFly', [uiRouter])
  .component('listMessageFly', ListMessageFlyComponent)
  .component('newMessageFly', NewMessageFlyComponent)
  .component('viewMessageFly', ViewMessageFlyComponent)
  .config(routing)
  .name;
