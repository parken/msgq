/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('home.dash', {
      url: '?otp&id',
      template: '<home-dash></home-dash>',
    });
}
