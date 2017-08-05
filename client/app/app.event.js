/* @ngInject */
function events($rootScope, OAuth, $state) {
  // eslint-disable-next-line angular/on-watch
  $rootScope
    .$on('$stateChangeStart', (event, next, nextParams) => {
      if (!OAuth.isAuthenticated() && next.auth && !['login'].includes(next.name)) {
        event.preventDefault();
        $state.go('login', { params: { next: next.name, nextParams } });
      }
    });
}

export default events;
