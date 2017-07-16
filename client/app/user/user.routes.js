/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('users', {
      abstract: true,
      url: '/users',
      template: '<div ui-view=""></div>',
    });
}
