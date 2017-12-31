import template from './notepad.pug';

class NotepadController {
  /* @ngInject */
  constructor($state, $stateParams, Session, defaultService) {
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.Session = Session;
    this.defaultService = defaultService;
  }

  $onInit() {
    this.oauth = this.Session.read('oauth');
    this.contactsList = '';
    this.retrieveNotepadTxt();
  }

  sendSms() {
    this.$state.go('sendSms',  { contacts: this.contactsList });
  }

  retrieveNotepadTxt() {
    const config = this.Session.read(this.defaultService.getServiceName());
    this.contactsList = config.contactsList;
    this.tempText = config.temp;
  }

  saveTemp() {
    const config = this.Session.read(this.defaultService.getServiceName());
    config.temp = this.tempText;
    this.Session.create(this.defaultService.getServiceName(), config);
  }

  saveContacts() {
    const config = this.Session.read(this.defaultService.getServiceName());
    config.contactsList = this.contactsList;
    this.Session.create(this.defaultService.getServiceName(), config);
  }

}


const NotepadComponent = {
  template,
  controller: NotepadController,
};

export default NotepadComponent;
