/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('user.credits', {
      abstract: true,
      url: '/credits',
      template: '<div ui-view=""></div>',
    })
    .state('user.credits.list', {
      url: '',
      template: '<list-credit></list-credit>',
    })
    .state('user.credits.new', {
      url: '/new',
      template: '<new-credit></new-credit>',
    });
}
