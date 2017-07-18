import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './user.routes';
import AddUser from './add';
import Profile from './profile';

export default angular
  .module('msgQueApp.user', [
    uiRouter, AddUser, Profile,
  ])
  .config(routing)
  .name;
