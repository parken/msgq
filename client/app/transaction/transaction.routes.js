/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('transactions', {
      abstract: true,
      url: '/transactions',
      template: '<div ui-view=""></div>',
    })
    .state('transactions.list', {
      url: '',
      template: '<list-transaction></list-transaction>',
    })
    .state('transactions.new', {
      url: '/new',
      template: '<new-transaction></new-transaction>',
    })
    .state('transaction', {
      abstract: true,
      url: '/transactions/:id',
      template: '<div ui-view=""></div>',
    })
    .state('transaction.view', {
      url: '',
      template: '<view-transaction></view-transaction>',
    })
    .state('transaction.edit', {
      url: '/edit',
      template: '<new-transaction></new-transaction>',
    });
}
