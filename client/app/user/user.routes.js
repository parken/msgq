/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('user', {
      abstract: true,
      url: '/users',
      template: '<div ui-view=""></div>',
    });
}
