/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('user.balances', {
      abstract: true,
      url: '/balances',
      template: '<div ui-view=""></div>',
    })
    .state('user.balances.list', {
      url: '',
      template: '<list-balance></list-balance>',
    })
    .state('user.balances.new', {
      url: '/new',
      template: '<new-balance></new-balance>',
    });
}
