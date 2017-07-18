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
      this.id = this.$state.current.name === 'users.edit' ? this.$stateParams.id : this.user.id;
    }
  }

  submit() {
    this.$http[this.id ? 'put' : 'post'](`/users${this.id ? `/${this.id}` : ''}`, this.data)
      .then(({ data: user }) => this.$http.get(`/users/${user.id}/sendLogin`))
      .then(() => {
        this.message = 'Success.';
        delete this.data;
      })
      .catch(() => (this.message = 'Error creating user.'));
  }
}

export default UserAddController;
