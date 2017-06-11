import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './home.routes';
import HomeList from './home-list';


export default angular
  .module('msgQueApp.home', [
    uiRouter, HomeList,
  ])
  .config(routing)
  .name;
