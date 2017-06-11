/* @ngInject */
export function routeConfig(
  $urlRouterProvider, $locationProvider, $httpProvider
  ) {
  $httpProvider.interceptors.push('UrlInterceptor');

  $urlRouterProvider.when('/', '/home');
  $urlRouterProvider.otherwise('/home');

  $locationProvider.html5Mode(true);
}
