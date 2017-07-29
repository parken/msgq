import template from './new-upstream.pug';

class NewUpstreamcontroller {
  /* @ngInject */
  constructor($state, Session, Enum) {
    this.$state = $state;
    this.Session = Session;
    this.Enum = Enum;
    this.routes = this.Enum.routes;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.data = {
      active: 1,
      routeId: 1,
    };
  }

  submit() {

  }
}

const NewUpstreamComponent = {
  template,
  controller: NewUpstreamcontroller,
};

export default NewUpstreamComponent;

