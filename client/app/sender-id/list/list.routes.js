/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('senderId.list', {
      url: '',
      template: '<sender-id-list></sender-id-list>',
    });
}
