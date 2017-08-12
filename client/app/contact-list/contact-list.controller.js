import template from './contact-list.pug';

class ContactListController {
  /* @ngInject */
  constructor($http, $state, Session, ContactNew) {
    this.$http = $http;
    this.$state = $state;
    this.Session = Session;
    this.ContactNew = ContactNew;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.contacts = [{ name: 'Digender', expiry: null, groups: this.groupId }];
  }
}

const ContactListComponent = {
  template,
  controller: ContactListController,
};

export default ContactListComponent;
