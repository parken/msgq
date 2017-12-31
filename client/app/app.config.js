/* @ngInject */
export function routeConfig($urlRouterProvider, $locationProvider, $httpProvider) {
  $httpProvider.interceptors.push('UrlInterceptor');
  $urlRouterProvider.when('/', '/send-sms');

  $urlRouterProvider.otherwise(($injector) => $injector.get('$state').go('four-o-four'));
  $locationProvider.html5Mode(true);
}
