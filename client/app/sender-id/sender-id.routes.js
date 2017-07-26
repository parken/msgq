/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('senderId', {
      abstract: true,
      url: '/senderId',
      template: '<div ui-view=""></div>',
    });
}
