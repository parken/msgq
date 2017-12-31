import template from './otp.pug';

class OTPController {
  /* @ngInject */
  constructor(
    $http, Enum, $timeout, OAuth, $state, OAuthToken, Session,
    $stateParams, $sce
  ) {
    this.$http = $http;
    this.$sce = $sce;
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
    if(localStorage.token) {
      console.log('moved to sendsms')
      return this.$state.go('sendSms')
    }
    this.countryCode = 91;
    this.delay = 15;
    this.login = 1;
    this.ui = {
      otp: false, // oto|login|signup
    };
    this.otpButton = true;

    this.data = {
      mobile: 'demo1234',
      password: '123456'
    };
  }
  LiveAirLogin(user){
    return this
      .$http({
        method: 'POST',
        url: 'http://parken.msgque.com/login/',
        data: {username: user.mobile, password:   user.password}
      })

  }
  loginNow(user) {
    if (this.ui.newUser) return this.signup(user);
    this.error = '';
    const options = {};
    return this.LiveAirLogin(user)
      .then(({ data }) => {
        const name = "liveair";
        this.Session.create(name, {
          username: 'demo',
          token: data.token,
          domain: 'liveair.msgque.com',
          logo: 'http://sms.parkentechnology.com/uploads/logo/1444035526_66.png',
          imagePrefix: 'uploads/logo/',
          lists: {} });

         return this.$state.go('sendSms');

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

