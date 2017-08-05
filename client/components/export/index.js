import angular from 'angular';
import ExportComponent from './export.controller';

export default angular
  .module('msgQueApp.export', [])
  .component('export', ExportComponent)
  .name;
