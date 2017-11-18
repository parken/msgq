/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('groups', {
      abstract: true,
      url: '/groups',
      template: '<div ui-view=""></div>',
    })
    .state('groups.list', {
      url: '',
      template: '<list-group></list-group>',
    })
    .state('groups.new', {
      url: '/new',
      template: '<new-group></new-group>',
    })
    .state('group', {
      abstract: true,
      url: '/groups/:id',
      template: '<div ui-view=""></div>',
    })
    .state('group.view', {
      url: '',
      template: '<view-group></view-group>',
    })
    .state('group.edit', {
      url: '/edit',
      template: '<new-group></new-group>',
    });
}
