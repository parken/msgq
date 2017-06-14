import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './profile.routes';
import UserProfileComponent from './profile.component';

export default angular
  .module('msgQueApp.user.profile', [uiRouter])
  .config(routing)
  .component('userProfile', UserProfileComponent)
  .name;
