import angular from 'angular';
import NavigationComponent from './navigation.component';

export default angular
  .module('msgQueApp.nav', [])
  .component('nav', NavigationComponent)
  .name;
