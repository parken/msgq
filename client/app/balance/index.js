import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewBalanceComponent from './new-balance/new-balance.controller';
import ListBalanceComponent from './list-balance/list-balance.controller';

import routing from './balance.routes';

export default angular
  .module('msgQueApp.Balance', [uiRouter])
  .component('listBalance', ListBalanceComponent)
  .component('newBalance', NewBalanceComponent)
  .component('listCredit', ListBalanceComponent)
  .component('newCredit', NewBalanceComponent)
  .config(routing)
  .name;
