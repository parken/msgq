import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ProviderComponent from './provider.controller';

import routing from './provider.routes';

export default angular
  .module('msgQueApp.provider', [uiRouter])
  .component('provider', ProviderComponent)
  .config(routing)
  .name;
