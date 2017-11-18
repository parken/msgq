import angular from 'angular';
import NavigationComponent from './navigation.component';

export default angular
  .module('msgQueApp.adminNavigation', [])
  .component('adminNavigation', NavigationComponent)
  .name;
