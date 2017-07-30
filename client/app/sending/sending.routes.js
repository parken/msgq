/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('sendings', {
      abstract: true,
      url: '/sendings',
      template: '<div ui-view=""></div>',
    })
    .state('sendings.list', {
      url: '',
      template: '<list-sending></list-sending>',
    })
    .state('sendings.new', {
      url: '/new',
      template: '<new-sending></new-sending>',
    });
}
