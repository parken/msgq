import angular from 'angular';
import fileReader from './file-reader.directive';

export default angular
  .module('msgQueApp.file-reader', [])
  .directive('fileReader', fileReader)
  .name;
