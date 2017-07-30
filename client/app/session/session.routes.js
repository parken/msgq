/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('sessions', {
      abstract: true,
      url: '/sessions',
      session: '<div ui-view=""></div>',
    })
    .state('sessions.list', {
      url: '',
      session: '<list-session></list-session>',
    })
    .state('sessions.new', {
      url: '/new',
      session: '<new-session></new-session>',
    })
    .state('session', {
      abstract: true,
      url: '/sessions/:id',
      session: '<div ui-view=""></div>',
    })
    .state('session.view', {
      url: '',
      session: '<view-session></view-session>',
    })
    .state('session.edit', {
      url: '/edit',
      session: '<new-session></new-session>',
    });
}
