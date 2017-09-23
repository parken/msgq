import template from './user-new.pug';

class UserAddController {
  /* @ngInject */
  constructor($http, $state, $stateParams, Session, Enum, toast) {
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.Session = Session;
    this.Enum = Enum;
    this.toast = toast;
  }

  $onInit() {
    const roleIdMap = {
      1: 2,
      2: 4,
      4: 5,
    };
    this.user = this.Session.read('userinfo');
    this.data = {
      roleId: roleIdMap[this.user.roleId],
    };
    this.roles = this.Enum.roles.filter(x => (this.user.roleId <= x.val));
    if (this.$state.is('users.new')) {
      this.header = 'Add New User'
    } else {
      this.header = 'Edit Details';
      this.getUser();
    }
  }

  getUser() {
    if (this.$state.is('user.new')) return;
    this.$http.get(`/users/${this.$stateParams.id}`)
      .then(({ data: user }) => {
        this.data = user;
      });
  }

  submit() {
    if (!this.data.password) delete this.data.password;
    this.$http.post(`/users${this.id ? `/${this.id}` : ''}`, this.data)
      // .then(({ data: user }) => this.$http.get(`/users/${user.id}/sendLogin`))
      .then(({ data: user }) => {
        this.message = 'Successfully saved.';
        this.$state.go('user.view', { id: user.id})
      })
      .catch(this.toast.next);
  }
}

const UserAddComponent = {
  template,
  controller: UserAddController,
};

export default UserAddComponent;
