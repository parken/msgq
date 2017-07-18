class CreateGroupController {
  /* @ngInject */
  constructor($state, Session) {
    this.$state = $state;
    this.Session = Session;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.groups = [ { id: 1, name: 'first', contacts: [{ id: 1, name: 'manjesh', expiry: null, groups: 1}] }];
  }

  createGroup(name) {
    const group = { id: this.groups.length + 1, name, contacts: []};
    this.groups.push(group);
    this.groupName = '';
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
