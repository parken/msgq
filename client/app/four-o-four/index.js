import angular from 'angular';
import uiRouter from 'angular-ui-router';
import FourOFourComponent from './four-o-four.component';
import routing from './four-o-four.routes';

export default angular
  .module('msgQueApp.four-o-four', [uiRouter])
  .config(routing)
  .component('fourOFour', FourOFourComponent)
  .name;
