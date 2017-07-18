import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './sender-id.routes';
import SenderIdList from './list';
import SenderIdView from './view';

export default angular
  .module('msgQueApp.senderId', [
    uiRouter, SenderIdList, SenderIdView,
  ])
  .config(routing)
  .name;
