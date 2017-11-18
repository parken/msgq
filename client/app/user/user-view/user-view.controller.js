import template from './user-view.pug';
class controller {
  /* @ngInject */
  constructor($http, Session, $stateParams) {
    this.$http = $http;
    this.Session = Session;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    const { id = this.user.id } = this.$stateParams;
    this.$http.get(`/users/${id}`)
      .then(({ data }) => {
        this.data = data;
      });
  }
}

export default {
  template,
  controller,
};

