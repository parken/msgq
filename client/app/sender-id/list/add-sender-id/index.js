import angular from 'angular';
import AddSenderId from './add-sender-id.service';

export default angular
  .module('msgQueApp.addSenderId', [])
  .service('AddSenderId', AddSenderId)
  .name;
