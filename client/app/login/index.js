import angular from 'angular';
import uiRouter from 'angular-ui-router';
import FourOFourComponent from './login.component';
import routing from './login.routes';

export default angular
  .module('msgQueApp.four-o-four', [uiRouter])
  .config(routing)
  .component('fourOFour', FourOFourComponent)
  .name;
