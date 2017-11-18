import angular from 'angular';
import uiRouter from 'angular-ui-router';
import NewCampaignComponent from './new-campaign/new-campaign.controller';
import ListCampaignComponent from './list-campaign/list-campaign.controller';
import ViewCampaignComponent from './view-campaign/view-campaign.controller';

import routing from './campaign.routes';

export default angular
  .module('msgQueApp.Campaign', [uiRouter])
  .component('listCampaign', ListCampaignComponent)
  .component('newCampaign', NewCampaignComponent)
  .component('viewCampaign', ViewCampaignComponent)
  .config(routing)
  .name;
