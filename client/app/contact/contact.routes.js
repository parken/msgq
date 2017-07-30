/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('contacts', {
      abstract: true,
      url: '/contacts',
      template: '<div ui-view=""></div>',
    })
    .state('contacts.list', {
      url: '',
      template: '<list-contact></list-contact>',
    })
    .state('contacts.new', {
      url: '/new',
      template: '<new-contact></new-contact>',
    })
    .state('contact', {
      abstract: true,
      url: '/contacts/:id',
      template: '<div ui-view=""></div>',
    })
    .state('contact.view', {
      url: '',
      template: '<view-contact></view-contact>',
    })
    .state('contact.edit', {
      url: '/edit',
      template: '<new-contact></new-contact>',
    });
}
