import template from './list-upstream.pug';
class ListUpstreamController {
  /* @ngInject */
  constructor($state, Session, Enum) {
    this.$state = $state;
    this.Session = Session;
    this.Enum = Enum;
    this.routes = this.Enum.routes;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.rows = [25, 50, 100, 250, 500];
  }
}

const ListUpstreamComponent = {
  template,
  controller: ListUpstreamController,
};

export default ListUpstreamComponent;

