class AddUserController {
  /* @ngInject */
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/users/20/sendLogin');
  }

  submit() {
    this.$http.post('/users', this.data)
      .then(({ data: user }) => this.$http.get(`/users/${user.id}/sendLogin`))
      .catch(err => console.log(err));
  }
}

export default AddUserController;
