/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('user.add', {
      url: '/add',
      template: '<add-user></add-user>',
    });
}
