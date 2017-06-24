/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('home.sendSms', {
      url: '/send-sms',
      template: '<send-sms></send-sms>',
    });
}
