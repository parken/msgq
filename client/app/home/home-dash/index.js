import angular from 'angular';
import uiRouter from 'angular-ui-router';
import HomeListComponent from './home-list.component';
import routing from './home-list.routes';

export default angular
  .module('msgQueApp.home-dash', [uiRouter])
  .config(routing)
  .component('homeDash', HomeListComponent)
  .name;
