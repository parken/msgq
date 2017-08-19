class ScheduleSmsController {
  /* @ngInject */
  constructor($http, $state, Session, $uibModalInstance) {
    this.$http = $http;
    this.$state = $state;
    this.Session = Session;
    this.$uibModalInstance = $uibModalInstance;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.data = {};
  }

  schedule() {

  }


}

export default ScheduleSmsController;
