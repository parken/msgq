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
    this.$http
      .get('/feed')
      .then(({ data: rss }) => (this.items = rss.items));
  }
}

export default HomeListController;
