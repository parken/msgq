class UserAddController {
  /* @ngInject */
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
  }

  submit() {
    this.$http.post('/users', this.data)
      .then(({ data: user }) => this.$http.get(`/users/${user.id}/sendLogin`))
      .then(() => {
        this.message = 'User created successfully.';
        delete this.data;
      })
      .catch(() => (this.message = 'Error creating user.'));
  }
}

export default UserAddController;
