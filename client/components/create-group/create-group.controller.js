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
      .then(({ data }) => {
        this.groupName = '';
        this.groups.push(data);
      });
  }

  deleteGroup() {

  }

  viewGroup() {
    this.contacts = this.groups[0].contacts;
  }

}

export default CreateGroupController;




/*
*
*
*
* */
