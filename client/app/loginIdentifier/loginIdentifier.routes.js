/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('loginIdentifiers', {
      abstract: true,
      url: '/loginIdentifiers',
      template: '<div ui-view=""></div>',
    })
    .state('loginIdentifiers.list', {
      url: '',
      template: '<list-login-identifier></list-login-identifier>',
    })
    .state('loginIdentifiers.new', {
      url: '/new',
      template: '<new-login-identifier></new-login-identifier>',
    })
    .state('loginIdentifier', {
      abstract: true,
      url: '/loginIdentifiers/:id',
      template: '<div ui-view=""></div>',
    })
    .state('loginIdentifier.view', {
      url: '',
      template: '<view-login-identifier></view-login-identifier>',
    })
    .state('loginIdentifier.edit', {
      url: '/edit',
      template: '<new-login-identifier></new-login-identifier>',
    });
}
