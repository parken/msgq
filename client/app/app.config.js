/* @ngInject */
export function routeConfig($urlRouterProvider, $locationProvider, $httpProvider) {
  $httpProvider.interceptors.push('UrlInterceptor');
  $urlRouterProvider.when('/', '/home');
  $urlRouterProvider.otherwise(($injector) => $injector.get('$state').go('four-o-four'));
  $locationProvider.html5Mode(true);
}
