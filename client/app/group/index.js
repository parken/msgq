import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewGroupComponent from './new-group/new-group.controller';
import ListGroupComponent from './list-group/list-group.controller';
import ViewGroupComponent from './view-group/view-group.controller';

import routing from './group.routes';

export default angular
  .module('msgQueApp.Group', [uiRouter])
  .component('listGroup', ListGroupComponent)
  .component('newGroup', NewGroupComponent)
  .component('viewGroup', ViewGroupComponent)
  .config(routing)
  .name;
