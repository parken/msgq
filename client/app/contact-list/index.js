import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ContactListComponent from './contact-list.controller';
import routing from './contact-list.routes';
import ContactNew from '../../components/contact-new';

export default angular
  .module('msgQueApp.contact-list', [uiRouter, ContactNew])
  .component('contactList', ContactListComponent)
  .config(routing)
  .name;
