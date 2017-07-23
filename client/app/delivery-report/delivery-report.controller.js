class DeliveryReportController {
  /* @ngInject */
  constructor($state, $http, Session) {
    this.$state = $state;
    this.$http = $http;
    this.Session = Session;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.loadMessages();
  }

  loadMessages() {
    this.$http
      .get('/messageFly')
      .then(({ data }) => {
        console.log(data);
      });
  }
}

export default DeliveryReportController;
