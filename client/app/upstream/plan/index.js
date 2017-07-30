import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewPlanComponent from './new-plan/new-plan.controller';
import ListPlanComponent from './list-plan/list-plan.controller';

import routing from './plan.routes';

export default angular
  .module('msgQueApp.Plan', [uiRouter])
  .component('listPlan', ListPlanComponent)
  .component('newPlan', NewPlanComponent)
  .config(routing)
  .name;
