class SenderIdViewController {
  /* @ngInject */
  constructor($state, $http, $stateParams, OAuth, OAuthToken, Session) {
    this.$state = $state;
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.OAuth = OAuth;
    this.Session = Session;
    this.OAuthToken = OAuthToken;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.$http.get(`/senderId/${this.$stateParams.id}`)
      .then(({ data }) => (this.senderId = data));
  }

  approve(status) {
    this.$http.put(`/senderId/${this.$stateParams.id}/${status ? 'approve' : 'block'}`)
      .then(() => (this.senderId.status = status));
  }
}

export default SenderIdViewController;
