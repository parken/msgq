/* @ngInject */
function authConfig($httpProvider, $provide, urls, OAuthTokenProvider, OAuthProvider) {
  // angular-oauth2
  $httpProvider.interceptors.push('oauthInterceptor');

  $provide.decorator('OAuthToken', ($delegate, $injector) => {
    const Token = {
      setToken(token) {
        return $injector.get('Session').create(urls.token, token);
      },
      getToken() {
        return $injector.get('Session').read(urls.token) || false;
      },
      getAccessToken() {
        const token = $injector.get('Session').read(urls.token);
        if (token && token.access_token) return token.access_token;
        return false;
      },
      removeToken() {
        return $injector.get('Session').remove(urls.token);
      },
    };
    Object.defineProperties($delegate, {
      token: {
        set: Token.setToken,
        get: Token.getToken,
        enumerable: true,
        configurable: true,
      },
    });

    Object.assign($delegate, Token);

    return $delegate;
  });

  OAuthTokenProvider.configure({
    name: 'token',
    options: {
      secure: urls.SSL,
      path: '/',
    },
  });

  OAuthProvider.configure({
    baseUrl: urls.API_SERVER,
    clientId: 'xclientid',
    clientSecret: 'xclientsecret', // optional
    grantPath: '/oauth/token',
    revokePath: '/oauth/revoke',
  });
}

export default authConfig;
