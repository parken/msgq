import template from './contact-new.pug';
import controller from './contact-new.controller'

class ContactNewService {
  /* @ngInject */
  constructor($uibModal) {
    this.$uibModal = $uibModal;
  }

  open() {
    return this
      .$uibModal
      .open({
        size: 'md applicant-state-filter',
        windowTopClass: 'bg-black-opacity',
        animation: true,
        template,
        controller,
        controllerAs: '$ctrl',
      })
      .result;
  }
}

export default ContactNewService;
