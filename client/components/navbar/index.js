import angular from 'angular';
import NavbarComponent from './navbar.component';

export default angular
  .module('msgQueApp.navbar', [])
  .component('navbar', NavbarComponent)
  .name;
