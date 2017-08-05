import template from './new-credit.pug';

class CreditController {
  /* @ngInject */
  constructor($http, $state, $stateParams, Session, Enum) {
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.Session = Session;
    this.Enum = Enum;
    this.routes = this.Enum.routes;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.data = {
      fromUserId: this.user.id,
      type: 'Selling',
      routeId: 1,
    };
    this.roles = this.Enum.roles.filter(x => (this.user.roleId <= x.val));
  }

  submit() {}
}

const CreditComponent = {
  template,
  controller: CreditController,
};

export default CreditComponent;
