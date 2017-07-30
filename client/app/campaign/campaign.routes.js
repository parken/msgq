/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('campaigns', {
      abstract: true,
      url: '/campaigns',
      template: '<div ui-view=""></div>',
    })
    .state('campaigns.list', {
      url: '',
      template: '<list-campaign></list-campaign>',
    })
    .state('campaigns.new', {
      url: '/new',
      template: '<new-campaign></new-campaign>',
    })
    .state('campaign', {
      abstract: true,
      url: '/campaigns/:id',
      template: '<div ui-view=""></div>',
    })
    .state('campaign.view', {
      url: '',
      template: '<view-campaign></view-campaign>',
    })
    .state('campaign.edit', {
      url: '/edit',
      template: '<new-campaign></new-campaign>',
    });
}
