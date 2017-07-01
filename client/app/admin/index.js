import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './admin.routes';

import controller from '../app.controller';
import template from './admin.pug';

import adminCtrl from './dashboard/dashboard.controller';
import adminTpl from './dashboard/dashboard.pug';

import Nav from './components/nav';

export default angular
  .module('msgQueApp.admin', [
    uiRouter, Nav
  ])
  .config(routing)
  .component('admin', {
    template,
    controller,
  })
  .component('adminDashboard', {
    template: adminTpl,
    controller: adminCtrl,
  })
  .name;
