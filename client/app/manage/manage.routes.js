/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('manage', {
      url: '/manage',
      template: '<div ui-view=""></div>',
    })
    .state('manage.dashboard', {
      url: '/dashboard',
      template: '<manage-dashboard></manage-dashboard>',
  });
}
