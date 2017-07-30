/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('upstreams', {
      abstract: true,
      url: '/upstreams',
      template: '<div ui-view=""></div>',
    })
    .state('upstreams.list', {
      url: '',
      template: '<list-upstream></list-upstream>',
    })
    .state('upstreams.new', {
      url: '/new',
      template: '<new-upstream></new-upstream>',
    })
    .state('upstream', {
      abstract: true,
      url: '/upstreams/:id',
      template: '<div ui-view=""></div>',
    })
    .state('upstream.view', {
      url: '',
      template: '<view-upstream></view-upstream>',
    })
    .state('upstream.edit', {
      url: '/edit',
      template: '<new-upstream></new-upstream>',
    });
}
