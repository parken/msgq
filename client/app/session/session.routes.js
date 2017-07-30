/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('sessions', {
      abstract: true,
      url: '/sessions',
      template: '<div ui-view=""></div>',
    })
    .state('sessions.list', {
      url: '',
      template: '<list-session></list-session>',
    })
    .state('sessions.new', {
      url: '/new',
      template: '<new-session></new-session>',
    })
    .state('session', {
      abstract: true,
      url: '/sessions/:id',
      template: '<div ui-view=""></div>',
    })
    .state('session.view', {
      url: '',
      template: '<view-session></view-session>',
    })
    .state('session.edit', {
      url: '/edit',
      template: '<new-session></new-session>',
    });
}
