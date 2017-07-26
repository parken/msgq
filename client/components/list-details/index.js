import angular from 'angular';
import ListDetailsComponent from './list-details.component';

export default angular
  .module('msgQueApp.list-details', [])
  .component('listDetails', ListDetailsComponent)
  .name;
