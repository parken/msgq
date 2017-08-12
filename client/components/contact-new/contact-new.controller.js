class ContactNewController {
  /* @ngInject */
  constructor($state, Session, $uibModalInstance) {
    this.$state = $state;
    this.Session = Session;
    this.$uibModalInstance = $uibModalInstance;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.data = {};
  }

  create() {
    this
      .$http
      .post(`/`, this.data)
      .then((data) => {

      });
  }
}

export default ContactNewController;
