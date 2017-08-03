import angular from 'angular';
import ContactNewComponent from './contact-new.component';

export default angular
  .module('msgQueApp.list-details', [])
  .component('contactNew', ContactNewComponent)
  .name;
