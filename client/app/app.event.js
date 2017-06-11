/* @ngInject */
function events($rootScope, OAuth, OTP) {
  // eslint-disable-next-line angular/on-watch
  $rootScope
    .$on('$stateChangeStart', (event, next, nextParams) => {
      if (!OAuth.isAuthenticated() && next.auth) {
        event.preventDefault();
        OTP.open({
          resolve: {
            options: { next, nextParams },
          },
        });
      }
    });
}

export default events;
