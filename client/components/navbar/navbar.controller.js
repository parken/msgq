class NavbarController {
  /* @ngInject */
  constructor($state, Session, OAuth) {
    this.$state = $state;
    this.Session = Session;
    this.OAuth = OAuth;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
  }

}

export default NavbarController;
