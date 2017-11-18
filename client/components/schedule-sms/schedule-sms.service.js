import template from './schedule-sms.pug';
import controller from './schedule-sms.controller'

class ScheduleSmsService {
  /* @ngInject */
  constructor($uibModal) {
    this.$uibModal = $uibModal;
  }

  open() {
    return this
      .$uibModal
      .open({
        size: 'md',
        windowTopClass: 'bg-white',
        animation: true,
        template,
        controller,
        controllerAs: '$ctrl',
      })
      .result;
  }
}

export default ScheduleSmsService;
