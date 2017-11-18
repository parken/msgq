/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('templates', {
      abstract: true,
      url: '/templates',
      template: '<div ui-view=""></div>',
    })
    .state('templates.list', {
      url: '',
      template: '<list-template></list-template>',
    })
    .state('templates.new', {
      url: '/new',
      template: '<new-template></new-template>',
    })
    .state('template', {
      abstract: true,
      url: '/templates/:id',
      template: '<div ui-view=""></div>',
    })
    .state('template.view', {
      url: '',
      template: '<view-template></view-template>',
    })
    .state('template.edit', {
      url: '/edit',
      template: '<new-template></new-template>',
    });
}
