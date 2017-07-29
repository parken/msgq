import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewUpstreamComponent from './new-upstream/new-upstream.controller';
import ListUpstreamComponent from './list-upstream/list-upstream.controller';
import ViewUpstreamComponent from './view-upstream/view-upstream.controller';

import routing from './upstream.routes';

export default angular
  .module('msgQueApp.upstream', [uiRouter])
  .component('listUpstream', ListUpstreamComponent)
  .component('newUpstream', NewUpstreamComponent)
  .component('viewUpstream', ViewUpstreamComponent)
  .config(routing)
  .name;
