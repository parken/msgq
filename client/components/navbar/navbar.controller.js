class NavbarController {
  /* @ngInject */
  constructor($state, Session, OAuth, OTP) {
    this.$state = $state;
    this.Session = Session;
    this.OAuth = OAuth;
    this.OTP = OTP;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
  }

}

export default NavbarController;
