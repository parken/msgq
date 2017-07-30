import angular from 'angular';
import toastService from './toast.service'
import utilService from './util.service'

export default angular
  .module('msgQueApp.services', [])
  .service('toast', toastService)
  .service('util', utilService)
  .name;
