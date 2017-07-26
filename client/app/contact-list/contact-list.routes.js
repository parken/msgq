/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('contact-list', {
      url: '/contact-list?group_id',
      template: '<contact-list></contact-list>',
    })
}
