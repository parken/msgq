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
        this.groupName = '';
        this.isCreateGrp = false;
        this.$http.get('/groups')
          .then(({ data }) => (this.groups = data));
      });
  }

  esc(event) {
    if (event.keyCode === 27) this.isCreateGrp = false;
  }
}

export default CreateGroupController;




/*
*
*
*
* */
