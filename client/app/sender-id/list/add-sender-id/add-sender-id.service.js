import controller from './add-sender-id.controller';
import template from './add-sender-id.pug';

class AddSenderIdService {
  /* @ngInject */
  constructor($uibModal) {
    this.$uibModal = $uibModal;
  }

  open(options = {}) {
    return this
      .$uibModal
      .open(Object.assign({
        windowTopClass: 'm-t-xxl',
        size: 'sm m-t-xxl',
        animation: true,
        template,
        controller,
        controllerAs: '$ctrl',
        resolve: {
          options: options.resolve || {},
        },
      }, options));
  }
}

export default AddSenderIdService;
