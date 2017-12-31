import './app.scss';
import angular from 'angular';

import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';
import ngCookies from 'angular-cookies';
import toaster from 'angularjs-toaster';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import base64File from 'angular-base64-upload';

import { routeConfig } from './app.config';

import AppComponent from './app.component';
import constants from './app.constant';
import setupGAnalytics from './app.ga.js';

import Auth from '../components/auth';
import AsideMenu from '../components/aside-menu';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import UpdateTitle from '../components/update-title';
import FileReader from '../components/file-reader';
import Navigation from '../components/navigation';
import CreateGroup from '../components/create-group';
import Export from '../components/export';
import Report from '../components/report';
import service from '../components/services';
import Notepad from '../components/notepad';
import ScheduleSmsService from '../components/schedule-sms';

import SendSms from './send-sms';
import FourOFour from './four-o-four';

import OTPModule from './otp';
import Provider from './provider';

import 'angular-oauth2';

setupGAnalytics('UA-98313820-1');  // Google Analytics
angular
  .module('msgQueApp', [
    ngCookies, ngAnimate, ngSanitize, uiRouter, 'angular-oauth2', uiBootstrap, toaster, base64File,
    // - framework
    AsideMenu, Navbar, Footer, constants, Auth, UpdateTitle, FileReader,
    FourOFour, OTPModule, Navigation,service, Export, Notepad, ScheduleSmsService,
    // - project specific
    Report, SendSms, CreateGroup,
    Provider, //Provider send SMS
  ])
  .component('msgqueApp', AppComponent)
  .config(routeConfig)
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
