/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('admin', {
      abstract: true,
      url: '/admin',
      template: '<admin></admin>',
    })
    .state('admin.dashboard', {
      url: '/dashboard',
      template: '<admin-dashboard></admin-dashboard>',
  });
}
