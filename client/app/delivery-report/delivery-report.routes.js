/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('deliveryReports', {
      url: '/delivery-report',
      template: '<delivery-report></delivery-report>',
    });
}
