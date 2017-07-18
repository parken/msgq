import angular from 'angular';
import CreateGroupComponent from './create-group.component';

export default angular
  .module('msgQueApp.create-group', [])
  .component('createGroup', CreateGroupComponent)
  .name;
