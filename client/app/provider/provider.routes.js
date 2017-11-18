/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('provider', {
      url: '/provider?name,token,username,logo,domain',
      template: '<provider></provider>',
    });
}
