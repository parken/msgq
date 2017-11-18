/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('message-flys', {
      abstract: true,
      url: '/message-flys',
      template: '<div ui-view=""></div>',
    })
    .state('message-flys.list', {
      url: '',
      template: '<list-message-fly></list-message-fly>',
    })
    .state('message-flys.new', {
      url: '/new',
      template: '<new-message-fly></new-message-fly>',
    })
    .state('message-fly', {
      abstract: true,
      url: '/message-flys/:id',
      template: '<div ui-view=""></div>',
    })
    .state('message-fly.view', {
      url: '',
      template: '<view-message-fly></view-message-fly>',
    })
    .state('message-fly.edit', {
      url: '/edit',
      template: '<new-message-fly></new-message-fly>',
    });
}
