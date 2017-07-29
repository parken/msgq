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
    this.pages = [];
    this.user = this.Session.read('userinfo');
    this.rows = [25, 50, 100, 250, 500];
    this.data = {
      limit: 20,
      numFound: 500,
      page: 1,
    };
    for(let i=1; i<(this.data.numFound);i+=this.data.limit) this.pages.push(i);
  }
}

const ListUpstreamComponent = {
  template,
  controller: ListUpstreamController,
};

export default ListUpstreamComponent;

