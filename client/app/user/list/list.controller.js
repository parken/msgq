import template from './list.pug';

class controller {
  /* @ngInject */
  constructor($http, $state, $stateParams, Session) {
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.Session = Session;
  }

  $onInit() {

    this.getUsers()
  }

  getUsers() {
    return this.$http
      .get('/users')
      .then(({ data: users }) => {
        this.items = users;
      })
  }
}

export default {
  template,
  controller,
};
