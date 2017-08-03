class ReportController {
  /* @ngInject */
  constructor($state, Session) {
    this.$state = $state;
    this.Session = Session;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
  }

}

export default ReportController;
