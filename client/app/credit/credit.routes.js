/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('credits', {
      abstract: true,
      url: '/credits',
      template: '<div ui-view=""></div>',
    })
    .state('credits.list', {
      url: '',
      template: '<list-credit></list-credit>',
    })
    .state('credits.new', {
      url: '/new',
      template: '<new-credit></new-credit>',
    })
    .state('credit', {
      abstract: true,
      url: '/credits/:id',
      template: '<div ui-view=""></div>',
    })
    .state('credit.view', {
      url: '',
      template: '<view-credit></view-credit>',
    })
    .state('credit.edit', {
      url: '/edit',
      template: '<new-credit></new-credit>',
    });
}
