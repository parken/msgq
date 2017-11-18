import angular from 'angular';
import toaster from 'angularjs-toaster';
import toastService from './toast.service'
import utilService from './util.service'

export default angular
  .module('msgQueApp.services', [toaster])
  .service('toast', toastService)
  .service('util', utilService)
  .name;
