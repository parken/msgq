import controller from './otp.controller';
import template from './otp.pug';

class OTPService {
  /* @ngInject */
  constructor($uibModal) {
    this.$uibModal = $uibModal;
  }

  open(options = {}) {
    return this
      .$uibModal
      .open(Object.assign({
        windowTopClass: 'm-t-xxl',
        size: 'lg m-t-xxl',
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

export default OTPService;
