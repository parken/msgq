import angular from 'angular';
import ContactListComponent from './contact-list.component';
import ContactNew from '../../components/contact-new';

export default angular
  .module('msgQueApp.contact-list', [ContactNew])
  .component('contact-list', ContactListComponent)
  .name;
