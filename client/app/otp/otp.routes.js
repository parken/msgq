/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login?next,nextParams',
      template: '<otp></otp>',
    });
}
