/* @ngInject */
function authConfig($rootScope, $q, authService, $log, OAuthToken, OAuth, $state) {
  const rootScope = $rootScope;
  let refreshingToken = false;
  rootScope.$on('oauth:error', (event, rej) => {
    const rejection = rej;

    switch (rejection.data.error) {
      case 'invalid_token':
        // To Save Multiple Async RefreshToken Request
        if (refreshingToken) {
          $log.warn('Refresh token request already sent.');
          return $q.reject({ warning: 'Refresh token request already sent.' });
        }

        refreshingToken = true; // Set refresh_token reuqest tracker flag
        return OAuth
          .getRefreshToken()
          .then(() => {
            refreshingToken = false; // reset refresh_token reuqest tracker flag
            // confirm login and replace token in buffered requests
            authService
              .loginConfirmed('success', config => {
                const conf = config;
                conf.headers.Authorization = `Bearer ${OAuthToken.token.access_token}`;
                return conf;
              });
          })
          .catch(err => {
            refreshingToken = false; // reset refresh_token reuqest tracker flag
            if (err.status === 400) this.$state.go('login'); // show re-login modal
          });
      default:
    }

    return $state.go('login', { params: { error: rejection.data } });
  });
}

export default authConfig;
