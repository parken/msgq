import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewSessionComponent from './new-session/new-session.controller';
import ListSessionComponent from './list-session/list-session.controller';
import ViewSessionComponent from './view-session/view-session.controller';

import routing from './session.routes';

export default angular
  .module('msgQueApp.Session', [uiRouter])
  .component('listSession', ListSessionComponent)
  .component('newSession', NewSessionComponent)
  .component('viewSession', ViewSessionComponent)
  .config(routing)
  .name;
