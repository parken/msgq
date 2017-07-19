/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('users', {
      abstract: true,
      url: '/users',
      template: '<div ui-view=""></div>',
    })
    .state('users.list', {
      url: '',
      template: '<users-list></users-list>',
    })
    .state('users.add', {
      url: '/add',
      template: '<user-add></user-add>',
    })
    .state('users.profile-edit', {
      url: '/profile/edit',
      template: '<user-add></user-add>',
    })
    .state('users.profile', {
      url: '/profile',
      template: '<user-profile></user-profile>',
    })
    .state('user', {
      abstract: true,
      url: '/users/:id',
      template: '<div ui-view=""></div>',
    })
    .state('user.view', {
      url: '',
      template: '<user-profile></user-profile>',
    })
    .state('user.edit', {
      url: '/edit',
      template: '<user-add></user-add>',
    });
}
