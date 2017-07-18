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
    this.list = {
      type: [{
        name: 'transactional',
        value: 0,
      }, {
        name: 'promotional',
        value: 1,
      }],
    };
    this.data = { type: 0, mode: 0 };
  }

  sendMessage() {
    this.message = '';
    const { type, message } = this.data;
    const sms = { type, message };
    if (this.data.mode === 0) {
      sms.mobile = this.data.mobile;
    } else {
      sms.mobile = this.file.content.split('\n')
        .map(x => x.replace(new RegExp('"', 'g'), '')).filter(x => x)
        .join(',');
    }
    this.$http
      .post('/bulk/sms', sms)
      .then(() => (this.message = 'SMS send successfully.'))
      .catch(() => (this.message = 'Error sending message.'));
  }
}

export default HomeListController;
