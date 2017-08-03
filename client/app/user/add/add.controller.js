import template from './add.pug';

class UserAddController {
  /* @ngInject */
  constructor($http, $state, $stateParams, Session) {
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.Session = Session;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    if (this.$state.current.name === 'users.add') {
      this.header = 'Add New User'
    } else {
      this.header = 'Edit Details';
      this.id = this.$state.current.name === 'user.edit' ? this.$stateParams.id : this.user.id;
      this.getUser();
    }
  }

  getUser() {
    this.$http.get(`/users/${this.id}`)
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
      })
      .catch(() => (this.message = 'Error creating user.'));
  }
}

const UserAddComponent = {
  template,
  controller: UserAddController,
};

export default UserAddComponent;
