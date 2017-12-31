import angular from 'angular';
import 'angular-http-auth';
import Session from './session';
import UrlInterceptor from './url.interceptor';

import authConfig from './auth.config';

export default angular
  .module('msgQueApp.auth', [Session, 'http-auth-interceptor'])
  .factory('UrlInterceptor', UrlInterceptor)
  .config(authConfig)
  .name;
