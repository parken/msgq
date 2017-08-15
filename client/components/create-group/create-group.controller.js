class CreateGroupController {
  /* @ngInject */
  constructor($state, $http, Session) {
    this.$state = $state;
    this.$http = $http;
    this.Session = Session;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.$http.get('/groups')
      .then(({ data }) => (this.groups = data));
  }

  createGroup(name) {
    if (!name) return;
    this.$http.post('/groups', { name })
      .then(() => {
        this.$http.get('/groups')
          .then(({ data }) => (this.groups = data));
      });
  }

  deleteGroup() {

  }

}

export default CreateGroupController;




/*
*
*
*
* */
