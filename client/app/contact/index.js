import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewContactComponent from './new-contact/new-contact.controller';
import ListContactComponent from './list-contact/list-contact.controller';
import ViewContactComponent from './view-contact/view-contact.controller';

import routing from './contact.routes';

export default angular
  .module('msgQueApp.Contact', [uiRouter])
  .component('listContact', ListContactComponent)
  .component('newContact', NewContactComponent)
  .component('viewContact', ViewContactComponent)
  .config(routing)
  .name;
