import template from './list-upstream.pug';
class ListUpstreamController {
  /* @ngInject */
  constructor($http, $state, Session, Enum, toast, util) {
    this.$http = $http;
    this.util = util;
    this.$state = $state;
    this.Session = Session;
    this.Enum = Enum;
    this.routes = this.Enum.routes;
    this.toast = toast;
    this.util = util;
  }

  $onInit() {
    this.pages = [];
    this.user = this.Session.read('userinfo');
    this.rows = [20, 50, 100, 250, 500];
    this.ui = {
      page: 1,
      first: 1,
      last: 1,
    };
    this.data = {
      items: [],
      meta: {},
    };

    this.params = {
      limit: 20,
      offset: 0,
      fl: 'id,name,provider,balance,routeId,createdAt'
    };
    this.get();
  }

  get() {
    this
      .$http
      .get(`/upstreams`, { params: this.params })
      .then(({ data }) => {
        Object.assign(this.data, data);
        this.pages = this.util.pages(this.data.meta.numFound, this.params.limit);
        const length = this.pages.length;
        this.ui.last = this.pages[length - 1];
        this.data.start = (this.ui.page - 1) * this.params.limit + 1 || 1;
        this.data.end = (this.ui.page * this.params.limit) > this.data.meta.numFound
          ? this.data.meta.numFound
          : this.ui.page * this.params.limit;
      })
      .catch(this.toast.next);
  }

  forward() {
    if (this.ui.page === this.ui.last) return;
    this.ui.page = this.ui.page < this.ui.last ? this.ui.page + 1 : this.ui.page;
    this.changePage();
  }

  backward() {
    if (this.ui.page === 1) return;
    this.ui.page = this.ui.page > 1 ? this.ui.page - 1 : 1;
    this.changePage();
  }

  first() {
    if (this.ui.page === 1) return;
    this.ui.page = 1;
    this.changePage();
  }

  last() {
    if (this.ui.page === this.ui.last) return;
    this.ui.page = this.ui.last;
    this.changePage();
  }

  changePage() {
    this.params.offset = (this.ui.page - 1) * this.params.limit;
    this.get();
  }
}


const ListUpstreamComponent = {
  template,
  controller: ListUpstreamController,
};

export default ListUpstreamComponent;

