import template from './notepad.pug';

class NotepadController {
  /* @ngInject */
  constructor($state, $stateParams, Session) {
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.Session = Session;
  }

  $onInit() {
    this.oauth = this.Session.read('oauth');
    this.contactsList = '';
  }

  sendSms() {
    this.$state.go('sendSms',  { contacts: this.contactsList })
  }

}


const NotepadComponent = {
  template,
  controller: NotepadController,
};

export default NotepadComponent;
