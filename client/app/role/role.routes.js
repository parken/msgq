/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('roles', {
      abstract: true,
      url: '/roles',
      role: '<div ui-view=""></div>',
    })
    .state('roles.list', {
      url: '',
      role: '<list-role></list-role>',
    })
    .state('roles.new', {
      url: '/new',
      role: '<new-role></new-role>',
    })
    .state('role', {
      abstract: true,
      url: '/roles/:id',
      role: '<div ui-view=""></div>',
    })
    .state('role.view', {
      url: '',
      role: '<view-role></view-role>',
    })
    .state('role.edit', {
      url: '/edit',
      role: '<new-role></new-role>',
    });
}
