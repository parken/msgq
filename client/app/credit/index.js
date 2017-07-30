import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewCreditComponent from './new-credit/new-credit.controller';
import ListCreditComponent from './list-credit/list-credit.controller';

import routing from './credit.routes';

export default angular
  .module('msgQueApp.Credit', [uiRouter])
  .component('listCredit', ListCreditComponent)
  .component('newCredit', NewCreditComponent)
  .config(routing)
  .name;
