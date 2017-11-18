import template from './new-priorityNumber.pug';

class NewPriorityNumbercontroller {
  /* @ngInject */
  constructor($http, $stateParams, $state, Session, Enum, toast) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.Session = Session;
    this.Enum = Enum;
    this.routes = this.Enum.routes;
    this.toast = toast;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.data = {
      active: 1,
      routeId: 1,
    };
    this.get();
  }

  get() {
    const { id } = this.$stateParams;
    if (!id) return;
    this
      .$http
      .get(`/upstreams/${id}`)
      .then(({ data }) => this.data = data)
      .catch(this.toast.next);
  }

  submit() {
    const { id } = this.$stateParams;
    this.$http.post(`/upstreams/${id || ''}`, this.data)
      .then(({ data = { id } }) => {
        this.toast.show('success');
        this.$state.go('upstream.view', { id });
      })
      .catch(this.toast.next);
  }
}

const NewPriorityNumberComponent = {
  template,
  controller: NewPriorityNumbercontroller,
};

export default NewPriorityNumberComponent;

