class UserProfileController {
  /* @ngInject */
  constructor($http, Session) {
    this.$http = $http;
    this.Session = Session;
  }

  $onInit() {
    this.$http.get('/users/me')
      .then(({ data: user }) => {
        this.user = user;
        this.Session.create('userinfo', user);
      });
    this.$http.get('/company')
      .then(({ data: company }) => {
        this.company = company;
        this.Session.create('company', company);
      });
  }
}

export default UserProfileController;
