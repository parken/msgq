import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './manage.routes';

import manageCtrl from './dashboard/dashboard.controller';
import manageTpl from './dashboard/dashboard.pug';

export default angular
  .module('msgQueApp.manage', [
    uiRouter,
  ])
  .config(routing)
  .component('manageDashboard', {
    template: manageTpl,
    controller: manageCtrl,
  })
  .name;
