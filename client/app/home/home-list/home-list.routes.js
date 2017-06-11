/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('home.list', {
      url: '',
      template: '<home-list></home-list>',
    });
}
