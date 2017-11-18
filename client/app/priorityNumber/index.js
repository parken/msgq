import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewPriorityNumberComponent from './new-priorityNumber/new-priorityNumber.controller';
import ListPriorityNumberComponent from './list-priorityNumber/list-priorityNumber.controller';
import ViewPriorityNumberComponent from './view-priorityNumber/view-priorityNumber.controller';

import routing from './priorityNumber.routes';

export default angular
  .module('msgQueApp.PriorityNumber', [uiRouter])
  .component('listPriorityNumber', ListPriorityNumberComponent)
  .component('newPriorityNumber', NewPriorityNumberComponent)
  .component('viewPriorityNumber', ViewPriorityNumberComponent)
  .config(routing)
  .name;
