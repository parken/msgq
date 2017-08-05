import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './user.routes';
import creditRouting from './credit/credit.routes';
import balanceRouting from './balance/balance.routes';
import UserAddComponent from './user-new/user-new.controller';
import UserViewComponent from './user-view/user-view.controller';
import UsersListComponent from './list/user-list.controller';

export default angular
  .module('msgQueApp.user', [
    uiRouter, creditRouting, balanceRouting,
  ])
  .component('userAdd', UserAddComponent)
  .component('userView', UserViewComponent)
  .component('usersList', UsersListComponent)
  .config(routing)
  .name;
