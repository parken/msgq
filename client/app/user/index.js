import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './user.routes';
import creditRouting from './credit/credit.routes';
import balanceRouting from './balance/balance.routes';
import UserAddComponent from './user-new/user-new.controller';
import UserViewComponent from './user-view/user-view.controller';
import UsersListComponent from './list/user-list.controller';
import NewCreditComponent from './credit/new-credit/new-credit.controller';
import ListCreditComponent from './credit/list-credit/list-credit.controller';
import NewBalanceComponent from './balance/new-balance/new-balance.controller';
import ListBalanceComponent from './balance/list-balance/list-balance.controller';

export default angular
  .module('msgQueApp.user', [
    uiRouter, creditRouting, balanceRouting,
  ])
  .component('userAdd', UserAddComponent)
  .component('userView', UserViewComponent)
  .component('usersList', UsersListComponent)
  .component('listCredit', ListCreditComponent)
  .component('newCredit', NewCreditComponent)
  .component('listBalance', ListBalanceComponent)
  .component('newBalance', NewBalanceComponent)
  .config(routing)
  .name;
