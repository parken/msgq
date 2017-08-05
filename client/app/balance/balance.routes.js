/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('balances', {
      abstract: true,
      url: '/balances',
      template: '<div ui-view=""></div>',
    })
    .state('balances.list', {
      url: '',
      template: '<list-balance></list-balance>',
    })
    .state('balances.new', {
      url: '/new',
      template: '<new-balance></new-balance>',
    });
}
