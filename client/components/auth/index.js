import angular from 'angular';
import 'angular-http-auth';
import Session from './session';
import AUTH_EVENTS from './auth.constant';
import UrlInterceptor from './url.interceptor';
import authRun from './auth.run';
import authConfig from './auth.config';

export default angular
  .module('msgQueApp.auth', [Session, 'http-auth-interceptor'])
  .constant('AUTH_EVENTS', AUTH_EVENTS)
  .factory('UrlInterceptor', UrlInterceptor)
  .run(authRun)
  .config(authConfig)
  .name;
