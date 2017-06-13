import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './add-user.routes';
import AddUserComponent from './add-user.component';

export default angular
  .module('msgQueApp.user.add', [uiRouter])
  .config(routing)
  .component('addUser', AddUserComponent)
  .name;
