/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('users.add', {
      url: '/add',
      template: '<user-add></user-add>',
    })
    .state('users.profile-edit', {
      url: '/profile/edit',
      template: '<user-add></user-add>',
    })
    .state('users.edit', {
      url: '/edit/:id',
      template: '<user-add></user-add>',
    });
}
