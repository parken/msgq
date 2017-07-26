import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './home.routes';
// import HomeList from './home-list';
import HomeDash from './home-dash';

export default angular
  .module('msgQueApp.home', [
    uiRouter, HomeDash,//HomeList,
  ])
  .config(routing)
  .name;
