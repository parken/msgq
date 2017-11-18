import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewTemplateComponent from './new-template/new-template.controller';
import ListTemplateComponent from './list-template/list-template.controller';
import ViewTemplateComponent from './view-template/view-template.controller';

import routing from './template.routes';

export default angular
  .module('msgQueApp.Template', [uiRouter])
  .component('listTemplate', ListTemplateComponent)
  .component('newTemplate', NewTemplateComponent)
  .component('viewTemplate', ViewTemplateComponent)
  .config(routing)
  .name;
