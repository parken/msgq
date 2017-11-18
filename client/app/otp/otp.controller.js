import template from './otp.pug';

class OTPController {
  /* @ngInject */
  constructor(
    $http, Enum, $timeout, OAuth, $state, OAuthToken, Session,
    $stateParams
  ) {
    this.$http = $http;
    this.$timeout = $timeout;
    this.$state = $state;
    this.OAuth = OAuth;
    this.Session = Session;
    this.OAuthToken = OAuthToken;
    this.Enum = Enum;
    this.Number = Number;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.countryCode = 91;
    this.delay = 15;
    this.login = 1;
    this.ui = {
      otp: false, // oto|login|signup
    };
    this.otpButton = true;

    this.data = {};
  }

  loginNow(user) {
    if (this.ui.newUser) return this.signup(user);
    this.error = '';
    const options = {};
    return this.OAuth
      .getAccessToken({
        username: `${Number(user.mobile) ? this.countryCode : ''}${user.mobile}`,
        password: user.password,
      }, options)
      .then(({ data: oAuthToken }) => {
        this.OAuthToken.setToken(oAuthToken);
        return this.Session
          .update()
          .then((user) => { console.log(user)
            if (user && user.roleId === 1) return this.$state.go('manage.dashboard');
            if (user && user.roleId === 2) return this.$state.go('admin.dashboard');
            if (user && user.roleId === 3) return this.$state.go('sendSms');
            return this.$state.go('home.dash');
            // if (this.$stateParams.next) this.$state.go(this.$stateParams.next, this.$stateParams.nextParams);
          });
      })
      .catch(err => {
        this.error = err.data && err.data.error_description || err
          || err.statusText || 'Unexpected error contact hello@ayyayo.com';
      });
  }

  signup(user) {
    this.error = '';
    this.$http
      .post('/users/signup', Object.assign(user, { otp: user.password }))
      .then(() => {
        this.ui.newUser = false;
        return this.loginNow({ mobile: this.data.mobile, password: this.data.otp });
      })
      .catch(err => (this.error = err.data.error_description
        || err.statusText || 'Unexpected error contact hello@ayyayo.com'));
  }

  otpSend(user) {
    this.error = '';
    this.otpButton = false;
    this.$http
      .post('/users/otpLogin', { mobile: `${this.countryCode}${user.mobile}` })
      .then(({ data: { id, newUser } }) => {
        this.$timeout(() => (this.otpButton = true), this.delay * 1000);
        this.ui.newUser = newUser;
        this.otpSent = true;
        this.data.id = id;
        return this.data;
      })
      .catch(err => (this.error = err.data && err.data.error_description
        || err.statusText || 'Unexpected error contact hello@ayyayo.com'));
  }

  otpLogin(data) {
    return this.otpVerify({ mobile: `${this.countryCode}${data.mobile}`, otp: data.password })
      .then(() => this.loginNow(data));
  }

  otpVerify(data) {
    this.success = this.error = '';
    return this.$http
      .post('/users/otpVerify', data || this.data)
      .then(() => {
        this.success = 'OTP Verified';
        // this.$uibModalInstance.close({ otp: this.otp });
        // return Promise.resolve();
      })
      .catch(res => {
        this.error = res.data.error_description;
        return Promise.reject();
      });
  }
}

const OTPComponent = {
  template,
  controller: OTPController,
};

export default OTPComponent;

