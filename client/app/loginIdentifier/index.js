import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewLoginIdentifierComponent from './new-loginIdentifier/new-loginIdentifier.controller';
import ListLoginIdentifierComponent from './list-loginIdentifier/list-loginIdentifier.controller';
import ViewLoginIdentifierComponent from './view-loginIdentifier/view-loginIdentifier.controller';

import routing from './loginIdentifier.routes';

export default angular
  .module('msgQueApp.LoginIdentifier', [uiRouter])
  .component('listLoginIdentifier', ListLoginIdentifierComponent)
  .component('newLoginIdentifier', NewLoginIdentifierComponent)
  .component('viewLoginIdentifier', ViewLoginIdentifierComponent)
  .config(routing)
  .name;
