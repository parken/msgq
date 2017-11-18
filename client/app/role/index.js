import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewRoleComponent from './new-role/new-role.controller';
import ListRoleComponent from './list-role/list-role.controller';
import ViewRoleComponent from './view-role/view-role.controller';

import routing from './role.routes';

export default angular
  .module('msgQueApp.Role', [uiRouter])
  .component('listRole', ListRoleComponent)
  .component('newRole', NewRoleComponent)
  .component('viewRole', ViewRoleComponent)
  .config(routing)
  .name;
