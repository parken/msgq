/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('senderId.view', {
      url: '/:id',
      template: '<sender-id-view></sender-id-view>',
    });
}
