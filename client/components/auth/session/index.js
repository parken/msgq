import angular from 'angular';
import SessionService from './session.service';

export default angular
  .module('msgQueApp.session', [])
  .service('Session', SessionService)
  .name;
