class HomeListController {
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

  }
}

export default HomeListController;
