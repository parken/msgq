/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('user.add', {
      url: '/add',
      template: '<user-add></user-add>',
    });
}
