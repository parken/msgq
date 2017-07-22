class ContactListController {
  /* @ngInject */
  constructor($http, $state, Session, groupId) {
    this.$http = $http;
    this.$state = $state;
    this.Session = Session;
    this.groupId = groupId;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.contacts = [{ name: 'Digender', expiry: null, groups: this.groupId }];
  }
}

export default ContactListController;
