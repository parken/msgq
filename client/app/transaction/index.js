import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewTransactionComponent from './new-transaction/new-transaction.controller';
import ListTransactionComponent from './list-transaction/list-transaction.controller';
import ViewTransactionComponent from './view-transaction/view-transaction.controller';

import routing from './transaction.routes';

export default angular
  .module('msgQueApp.Transaction', [uiRouter])
  .component('listTransaction', ListTransactionComponent)
  .component('newTransaction', NewTransactionComponent)
  .component('viewTransaction', ViewTransactionComponent)
  .config(routing)
  .name;
