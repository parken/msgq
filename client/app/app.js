import './app.scss';
import angular from 'angular';

import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';
import ngCookies from 'angular-cookies';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

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
import AdminNavigation from '../components/admin-navigation';
import CreateGroup from '../components/create-group';
import Report from '../components/report';

import Manage from './manage';
import Admin from './admin';
import Home from './home';
import User from './user';

import SendSms from './send-sms';
import DeliveryReport from './delivery-report';
import SenderId from './sender-id';
import FourOFour from './four-o-four';
import ContactList from './contact-list';
import Upstream from './upstream';
import 'angular-oauth2';

setupGAnalytics('UA-98313820-1');  // Google Analytics
angular
  .module('msgQueApp', [
    ngCookies, ngAnimate, ngSanitize, uiRouter, 'angular-oauth2', uiBootstrap,
    // - framework
    AsideMenu, Navbar, Footer, constants, Auth, UpdateTitle, FileReader,
    Home, FourOFour, OTPModule, Navigation,
    // - project specific
    SenderId, DeliveryReport, Report, SendSms, User,
    AdminNavigation, CreateGroup, ContactList, Upstream,
    Manage, // - admin
    Admin, // - reseller
  ])
  .component('msgqueApp', AppComponent)
  .config(routeConfig)
  .run(events)
  .directive('watchChange', () => {
    return {
      scope: {
        onchange: '&watchChange'
      },
      link: function(scope, element, attrs) {
        element.on('input', () => {
          scope.$apply(() => {
            scope.onchange();
          });
        });
      }
    };
  });

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['msgQueApp'], {
      strictDi: true,
    });
  });
