/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('home.list', {
      url: '?otp&id',
      template: '<home-list></home-list>',
    });
}
