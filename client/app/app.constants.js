'use strict';

import angular from 'angular';

import appConfig from '../../server/config/environment/shared';

export default angular.module('msgqueApp.constants', [])
  .constant('appConfig', appConfig)
  .name;
