/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('upstream.plans', {
      abstract: true,
      url: '/plans',
      template: '<div ui-view=""></div>',
    })
    .state('upstream.plans.list', {
      url: '',
      template: '<list-plan></list-plan>',
    })
    .state('upstream.plans.new', {
      url: '/new',
      template: '<new-plan></new-plan>',
    });
}
