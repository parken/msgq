/* @ngInject */
export function routeConfig(
  $urlRouterProvider, $locationProvider, $httpProvider
  ) {
  $httpProvider.interceptors.push('UrlInterceptor');

  $urlRouterProvider.when('/', '/admin/dashboard');
  $urlRouterProvider.otherwise('/admin/dashboard');

  $locationProvider.html5Mode(true);
}
