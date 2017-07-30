/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('messages', {
      abstract: true,
      url: '/messages',
      template: '<div ui-view=""></div>',
    })
    .state('messages.list', {
      url: '',
      template: '<list-message></list-message>',
    })
    .state('messages.new', {
      url: '/new',
      template: '<new-message></new-message>',
    })
    .state('message', {
      abstract: true,
      url: '/messages/:id',
      template: '<div ui-view=""></div>',
    })
    .state('message.view', {
      url: '',
      template: '<view-message></view-message>',
    })
    .state('message.edit', {
      url: '/edit',
      template: '<new-message></new-message>',
    });
}
