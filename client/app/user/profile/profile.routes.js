/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('users.profile', {
      url: '/profile',
      template: '<user-profile></user-profile>',
    });
}
