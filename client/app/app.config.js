/* @ngInject */
export function routeConfig($urlRouterProvider, $locationProvider, $httpProvider) {
  $httpProvider.interceptors.push('UrlInterceptor');
  $urlRouterProvider.when('/', ($injector) => {
    const Session = $injector.get('Session');
    const user = Session.read('userinfo');
    const $state = $injector.get('$state');
    if (user && user.roleId === 1) return $state.go('manage.dashboard');
    if (user && user.roleId === 2) return $state.go('admin.dashboard');
    if (user && user.roleId === 3) return $state.go('sendSms');
    return $state.go('home.dash');
  });
  $urlRouterProvider.otherwise(($injector) => $injector.get('$state').go('four-o-four'));
  $locationProvider.html5Mode(true);
}
