class ProviderController {
  /* @ngInject */
  constructor($stateParams, $state, Session, Enum, toast) {
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.Session = Session;
    this.Enum = Enum;
    this.toast = toast;
  }

  $onInit() {
    const { name, username, token, domain, logo } = this.$stateParams;
    let imagePrefix = '';
    if(name === 'liveair') imagePrefix = 'uploads/logo/';
    this.Session.create(name, { username, token, domain, logo, imagePrefix, lists: {} });
    this.$state.go('sendSms');
  }
}

const ProviderComponent = {
  controller: ProviderController,
};

export default ProviderComponent;

