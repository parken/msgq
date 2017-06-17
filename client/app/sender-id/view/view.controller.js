class SenderIdViewController {
  /* @ngInject */
  constructor($state, $http, OAuth, OAuthToken, Session) {
    this.$state = $state;
    this.$http = $http;
    this.OAuth = OAuth;
    this.Session = Session;
    this.OAuthToken = OAuthToken;
  }

  $onInit() {
    console.log(this)
    if (this.$state.params.otp) {
      const user = this.$state.params;
      return this.OAuth
        .getAccessToken({
          username: `${user.id}`,
          password: user.otp,
        }, {})
        .then(({ data: oAuthToken }) => {
          this.OAuthToken.setToken(oAuthToken);
          return this.Session
            .update()
            .then(() => this.$state.go('home.list', {id: undefined, otp: undefined}));
        });
    }
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

export default SenderIdViewController;
