class NavigationController {
  /* @ngInject */
  constructor($state, Session) {
    this.$state = $state;
    this.Session = Session;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.menus = [
      {name: 'Send SMS', state: 'home.sendSms', icon: 'fa fa-chat'},
      {name: 'User', state: 'admin.users.list', icon: 'fa fa-user'},
    ];
  }

}

export default NavigationController;
