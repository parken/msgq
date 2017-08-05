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
    .state('users.new', {
      url: '/new',
      template: '<user-add></user-add>',
    })
    .state('user.profile-edit', {
      url: '/profile/edit',
      template: '<user-add></user-add>',
    })
    .state('users.profile', {
      url: '/profile',
      template: '<user-view></user-view>',
    })
    .state('user', {
      abstract: true,
      url: '/users/:id',
      template: '<div ui-view=""></div>',
    })
    .state('user.view', {
      url: '',
      template: '<user-view></user-view>',
    })
    .state('user.edit', {
      url: '/edit',
      template: '<user-add></user-add>',
    });
}
