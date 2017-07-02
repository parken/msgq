/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      abstract: true,
      url: '/home',
      template: '<div ui-view=""></div>',
    });
}
