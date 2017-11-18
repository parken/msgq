
class OTPController {
  /* @ngInject */
  constructor(
    $uibModalInstance, $http, Enum, $timeout, OAuth, $state, OAuthToken, Session, options
  ) {
    this.$http = $http;
    this.$timeout = $timeout;
    this.$state = $state;
    this.OAuth = OAuth;
    this.Session = Session;
    this.OAuthToken = OAuthToken;
    this.$uibModalInstance = $uibModalInstance;
    this.Enum = Enum;
    this.Number = Number;
    this.options = options;
  }

  $onInit() {
    this.data = { name: 'abc123', company: 'testC', message: 'message' };
  }

  submit() {
    this.$http
      .post('/senderId', this.data)
      .then(({ data: { message } }) => {
        this.message = message;
        delete this.data;
      })
      .catch(({ data: { message } }) => (this.message = message));
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}

export default OTPController;
