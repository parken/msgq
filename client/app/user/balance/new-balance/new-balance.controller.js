import template from './new-balance.pug';

class NewBalancecontroller {
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
      limit:1000,
      routeId: 1,
      userId: 2,
    };
    this.getUsers();
  }

  getUsers() {
    this.$http.get(`/users`)
      .then(({ data: { items } }) => {
        this.users = items;
      });
  }

  submit() {
    const { id } = this.$stateParams;
    this.$http.post(`/sending`, this.data)
      .then(() => {
        this.toast.show('success');
        this.$state.go('user.view', { id });
      })
      .catch(this.toast.next);
  }
}

const NewBalanceComponent = {
  template,
  controller: NewBalancecontroller,
};

export default NewBalanceComponent;

