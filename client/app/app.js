import './app.scss';
import angular from 'angular';

import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';
import ngCookies from 'angular-cookies';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

// import ngMessages from 'angular-messages';

import { routeConfig } from './app.config';

import AppComponent from './app.component';
import constants from './app.constant';
import events from './app.event';
import setupGAnalytics from './app.ga.js';

import OTPModule from '../components/otp';
import Auth from '../components/auth';
import AsideMenu from '../components/aside-menu';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import UpdateTitle from '../components/update-title';
import FileReader from '../components/file-reader';
import Navigation from '../components/navigation';
import Report from '../components/report';

import Admin from './admin';
import Home from './home';
import User from './user';
import DeliveryReport from './home/delivery-report';
import SenderId from './sender-id';
import FourOFour from './four-o-four';
import 'angular-oauth2';

setupGAnalytics('UA-98313820-1');  // Google Analytics
angular
  .module('msgQueApp', [
    ngCookies, ngAnimate, ngSanitize, uiRouter,
    'angular-oauth2',
    uiBootstrap,
    AsideMenu, Navbar, Footer, constants, Auth, UpdateTitle, FileReader,
    Home, FourOFour, OTPModule, User, SenderId, Navigation, DeliveryReport,
    Report, Admin
  ])
  .component('msgqueApp', AppComponent)
  .config(routeConfig)
  .run(events);

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['msgQueApp'], {
      strictDi: true,
    });
  });
