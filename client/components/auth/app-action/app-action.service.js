class AppActionService {
  /* @ngInject */
  constructor($window, $state, $http, Session, OAuth, OAuthToken) {
    this.localStorage = $window.localStorage;
    this.$window = $window;
    this.$state = $state;
    this.$http = $http;
    this.Session = Session;
    this.OAuth = OAuth;
    this.OAuthToken = OAuthToken;
  }

  logout(auto = true) {
    return this.OAuth
      .revokeToken()
      .then(() => {
        this.Session.destroy();
        if (!auto) return 0;
        if (this.$state.current.auth) this.$state.go('home.list');
        return this.$window.location.reload();
      });
  }

  loginUUID(uuid) {
    return this.logout(false)
      .then(() => this.$http.get(`/users/uuid/${uuid}`))
      .then(({ data: user }) => this.OAuth
        .getAccessToken({
          username: user.mobile,
          password: user.otp,
        }, {})
        .then(({ data: oAuthToken }) => {
          this.OAuthToken.setToken(oAuthToken);
          return this.Session.update();
        }));
  }
}

export default AppActionService;
