import angular from 'angular';
import UpdateTitle from './update-title.directive';

export default angular
  .module('msgQueApp.update-title', [])
  .directive('updateTitle', UpdateTitle)
  .name;
