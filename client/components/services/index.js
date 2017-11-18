import angular from 'angular';
import toaster from 'angularjs-toaster';
import toastService from './toast.service'
import utilService from './util.service'
import liveAirService from './providers/liveair.service';
import plivoService from './providers/plivo.service';


export default angular
  .module('msgQueApp.services', [toaster])
  .service('toast', toastService)
  .service('util', utilService)
  .service('liveair', liveAirService)
  .name;
