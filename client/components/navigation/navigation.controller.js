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
      {name: 'Send Custom SMS', state: 'home.customSMS', icon: 'fa fa-chat'},
      {name: 'Delivery Report', state: 'deliveryReport', icon: 'fa fa-chat'},
      {name: 'API', state: 'api', icon: 'fa fa-chat'},
      {name: 'Send OTP', state: 'otp', icon: 'fa fa-chat'},
      {name: 'Campaign', state: 'campaign', icon: 'fa fa-chat'},
      {name: 'Virtual Number', state: 'virtualNumber', icon: 'fa fa-chat'},
    ];
  }

}

export default NavigationController;
