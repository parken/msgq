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
    this.contacts = [{ number: 8879469792, name: 'Digender', expiry: null, groupId: this.groupId }];
    this
      .$http
      .get('/groups')
      .then(({ data: groups }) => (this.groups = groups.items || groups));
  }

  forward() {
    if (this.ui.page === this.ui.last) return;
    this.ui.page = this.ui.page < this.ui.last ? this.ui.page + 1 : this.ui.page;
    this.changePage();
  }

  backward() {
    if (this.ui.page === 1) return;
    this.ui.page = this.ui.page > 1 ? this.ui.page - 1 : 1;
    this.changePage();
  }

  first() {
    if (this.ui.page === 1) return;
    this.ui.page = 1;
    this.changePage();
  }

  last() {
    if (this.ui.page === this.ui.last) return;
    this.ui.page = this.ui.last;
    this.changePage();
  }

  changePage() {
    this.params.offset = (this.ui.page - 1) * this.params.limit;
    this.get();
  }
}

const ContactListComponent = {
  template,
  controller: ContactListController,
};

export default ContactListComponent;
