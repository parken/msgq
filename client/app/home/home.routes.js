import template from './home.pug';

/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      abstract: true,
      url: '/home',
      template,
    });
}
