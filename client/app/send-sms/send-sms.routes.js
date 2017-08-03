/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('sendSms', {
      url: '/send-sms',
      template: '<send-sms></send-sms>',
    });
}
