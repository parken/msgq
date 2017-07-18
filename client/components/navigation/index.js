import angular from 'angular';
import NavigationComponent from './navigation.component';

export default angular
  .module('msgQueApp.navigation', [])
  .component('navigation', NavigationComponent)
  .name;
