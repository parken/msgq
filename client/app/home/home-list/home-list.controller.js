class HomeListController {
  /* @ngInject */
  constructor($state, $http, OAuth, OAuthToken, Session) {
    this.$state = $state;
    this.$http = $http;
    this.OAuth = OAuth;
    this.Session = Session;
    this.OAuthToken = OAuthToken;
  }

  $onInit() {
    if (this.$state.params.otp) {
      const user = this.$state.params;
      return this.OAuth
        .getAccessToken({
          username: `${user.id}`,
          password: user.otp,
        }, {})
        .then(({data: oAuthToken}) => {
          this.OAuthToken.setToken(oAuthToken);
          return this.Session
            .update()
            .then(() => this.$state.go('home.list', {id: undefined, otp: undefined}));
        });
    }
  }

}

export default HomeListController;
