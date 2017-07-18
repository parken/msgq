/* @ngInject */
function authConfig($httpProvider) {
  $httpProvider.interceptors.push('UrlInterceptor');

  // angular-oauth2
  $httpProvider.interceptors.push('oauthInterceptor');
}

export default authConfig;
