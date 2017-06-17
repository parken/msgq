import angular from 'angular';
import AppAction from './app-action.service';

export default angular
  .module('msgQueApp.appAction', [])
  .service('AppAction', AppAction)
  .name;
