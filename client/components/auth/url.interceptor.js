/* @ngInject */
function UrlInterceptor(Session, urls, $rootScope, AUTH_EVENTS, OAuthToken) {
  return {
    request(config) {
      const conf = config;
      const secure = config.url[0] === '~';
      // handle url request without domain to api server
      if (['/', '~'].includes(conf.url[0])) {
        conf.url = `${urls.API_SERVER}/api${secure ? conf.url.substr(1) : conf.url}`;
      }

      if (!!conf.ignoreAuthModule) return conf; // don't need token

      // little bit hacky for now => if index is zero only then returns truthy
      if (secure && !conf.url.indexOf(urls.API_SERVER) && !Session.isLoggedIn) {
        // redirect to accounts for authentication if not loggedIn
        $rootScope.$broadcast(AUTH_EVENTS.loginRequired);
        return Promise.reject({ description: AUTH_EVENTS.loginRequired });
      }

      if (secure) conf.headers.Authorization = `Bearer ${OAuthToken.getAccessToken()}`;
      conf.headers.type = '{ "provider": "liveair", options: { "domain": "sms.parkentechnology.com", "token": "b9a7fc874a245e0f5e1cf46bb0455015" }}';
      return conf;
    },
  };
}

export default UrlInterceptor;
