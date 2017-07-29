import template from './view-upstream.pug';
class ViewUpstreamController {
  /* @ngInject */
  constructor($state, Session, Enum) {
    this.$state = $state;
    this.Session = Session;
    this.Enum = Enum;
    this.routes = this.Enum.routes;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.routes = [
      { val: 1, name: 'Promotional' },
      { val: 2, name: 'Transactional' },
      { val: 3, name: 'Sender Id' },
      { val: 4, name: 'OTP' },
      { val: 5, name: 'International' },
    ];
    this.data = {
      active: 1,
      routeId: 1,
    };
  }

  submit() {

  }
}

const ViewUpstreamComponent = {
  template,
  controller: ViewUpstreamController,
};

export default ViewUpstreamComponent;

