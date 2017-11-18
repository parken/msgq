/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('priorityNumbers', {
      abstract: true,
      url: '/priorityNumbers',
      template: '<div ui-view=""></div>',
    })
    .state('priorityNumbers.list', {
      url: '',
      template: '<list-priority-number></list-priority-number>',
    })
    .state('priorityNumbers.new', {
      url: '/new',
      template: '<new-priority-number></new-priority-number>',
    })
    .state('priorityNumber', {
      abstract: true,
      url: '/priorityNumbers/:id',
      template: '<div ui-view=""></div>',
    })
    .state('priorityNumber.view', {
      url: '',
      template: '<view-priority-number></view-priority-number>',
    })
    .state('priorityNumber.edit', {
      url: '/edit',
      template: '<new-priority-number></new-priority-number>',
    });
}
