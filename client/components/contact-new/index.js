import angular from 'angular';
import ContactNewService from './contact-new.service';
import uiBootstrap from 'angular-ui-bootstrap';

export default angular
  .module('msgQueApp.contact-new', [uiBootstrap])
  .service('ContactNew', ContactNewService)
  .name;
