/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('home.deliveryReports', {
      url: '/delivery-report',
      template: '<delivery-report></delivery-report>',
    });
}
