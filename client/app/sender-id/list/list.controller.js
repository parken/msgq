class SenderIdListController {
  /* @ngInject */
  constructor($state, $http, OAuth, OAuthToken, Session, AddSenderId) {
    this.$state = $state;
    this.$http = $http;
    this.OAuth = OAuth;
    this.Session = Session;
    this.OAuthToken = OAuthToken;
    this.AddSenderId = AddSenderId;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.$http.get('/senderId')
      .then(({ data }) => (this.senderIds = data));
  }
}

export default SenderIdListController;
