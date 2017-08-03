class ContactNewController {
  /* @ngInject */
  constructor($state, Session, $uibModelInstance) {
    this.$state = $state;
    this.Session = Session;
    this.$uibModelInstance = $uibModelInstance;
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
