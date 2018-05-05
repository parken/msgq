/* @ngInject */
function events($rootScope, $state, Session) {
  // eslint-disable-next-line angular/on-watch
  $rootScope
    .$on('$stateChangeStart', (event, next, nextParams) => {
      if (!Session.read('userinfo') && !['login'].includes(next.name)) {
        event.preventDefault();
        $state.go('login', { params: { next: next.name, nextParams } });
      }
    });
}

export default events;
