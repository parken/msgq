/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('admin', {
      url: '/admin',
      template: '<div ui-view=""></div>',
    })
    .state('admin.dashboard', {
      url: '/dashboard',
      template: '<admin-dashboard></admin-dashboard>',
  });
}
