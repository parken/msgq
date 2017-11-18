/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('senderIds', {
      abstract: true,
      url: '/senderIds',
      template: '<div ui-view=""></div>',
    })
    .state('senderIds.list', {
      url: '',
      template: '<list-sender-id></list-sender-id>',
    })
    .state('senderIds.new', {
      url: '/new',
      template: '<new-sender-id></new-sender-id>',
    });
}
