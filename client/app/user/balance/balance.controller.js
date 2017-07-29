import template from './balance.pug';

class BalanceController {
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
    if (this.$state.current.name === 'users.add') {
      this.header = 'Add New User'
    } else {
      this.header = 'Edit Details';
      this.id = this.$state.current.name === 'user.edit' ? this.$stateParams.id : this.user.id;
    }
  }



  submit() {}
}

const BalanceComponent = {
  template,
  controller: BalanceController,
};

export default BalanceComponent;
