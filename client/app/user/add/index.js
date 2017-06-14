import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './add.routes';
import UserAddComponent from './add.component';

export default angular
  .module('msgQueApp.user.add', [uiRouter])
  .config(routing)
  .component('userAdd', UserAddComponent)
  .name;
