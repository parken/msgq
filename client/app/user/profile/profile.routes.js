/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('user.profile', {
      url: '/profile',
      template: '<user-profile></user-profile>',
    });
}
