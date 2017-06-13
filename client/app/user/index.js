import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './user.routes';
import AddUser from './add-user';

export default angular
  .module('msgQueApp.user', [
    uiRouter, AddUser,
  ])
  .config(routing)
  .name;
