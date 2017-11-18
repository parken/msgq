import template from './new-plan.pug';

class NewPlancontroller {
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
  }

  submit() {
    const { id } = this.$stateParams;
    this.$http.post(`/upstreams/${id}/plans`, this.data)
      .then(({ data = { id } }) => {
        this.toast.show('success');
        this.$state.go('upstream.view', data);
      })
      .catch(this.toast.next);
  }
}

const NewPlanComponent = {
  template,
  controller: NewPlancontroller,
};

export default NewPlanComponent;

