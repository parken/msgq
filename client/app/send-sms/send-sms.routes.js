/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('sendSms', {
      url: '/send-sms?contacts',
      template: '<send-sms></send-sms>',
    });
}
