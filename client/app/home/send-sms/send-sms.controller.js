class SendSmsController {
  /* @ngInject */
  constructor($http, $state, Session, $scope) {
    this.$http = $http;
    this.$state = $state;
    this.Session = Session;
    this.Math = Math;
    this.$scope = $scope;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.data = {
      numbersList: [],
      senderId: '',
      message: '',
      unicode: 'true',
    }; //body of Api

    this.senderIdLength = 0;
    this.change = () => {
      this.senderIdLength = document.querySelector('#senderId').value.length;
    };

    this.error = {};
    this.routeIndex = 1;
    this.numberPattern = /[987]{1}\d{9}/;
    this.routes = [];

    // load initial routes on top
    this
      .$http
      .get('/routes')
      .then(({ data: { senderId, routes } }) => {
        if (senderId) {
          this.data.senderId = senderId;
          this.senderIdLength = senderId.length;
        }
        this.routes = routes.length ? routes : [{ id: 1, name: 'Promotional', balance: 50 }];
      });
    this.translation('true');
  }

  setRoute(routeId) {
      this.routeIndex = routeId;
      if (routeId === 1) return this.loadSenderIds();
      return this.senderId = '';
  }

  translation(unicode) {
    if(unicode === 'true') {
      // Load the Google Transliterate API

    }
  }

  validateNumbers() {
    if (!this.numbers) return;
    const numbers = this.numbers.replace(/\n/g, ',').split(',');

    numbers.forEach(n => {
      const reg = n.match(this.numberPattern);
      if (this.data.numbersList.includes(n) || !reg) {
        this.foundInvalidNumber = true;
        return;
      }
      this.data.numbersList.push(n);
    });
    this.numbers = this.data.numbersList.join(',');
    if (this.foundInvalidNumber) this.error.numberError = 'Some numbers were invalid/duplicate and were removed.';
  }

  loadSenderIds() {
    //load SenderIds on focus of message field
    this.field = 'senderId';
    this
      .$http
      .get('/senderId', { params: { fl: 'id,name' } })
      .then(({ data: senderIds }) => {
        this.list = this.senderIds = senderIds;
        if (!this.data.senderId && this.senderIds.length) this.data.senderId = this.senderIds[0].name;
        console.log(this.data.senderId )
      });
  }

  loadTemplates() {
    //load templates on focus of message field
    this.field = 'message';
    this
      .$http
      .get('/templates')
      .then(({ data: templates }) => this.list = templates);
  }

  loadCampaigns() {
    //load Campaigns on focus of message field
    this.field = 'campaignName';
    this
      .$http
      .get('/campaigns')
      .then(({ data: campaigns }) => this.list = campaigns);
  }

  loadGroups() {
    //load initial Groups
    this.field = 'groups';
    this
      .$http
      .get('/groups')
      .then(({ data: groups }) => this.list = groups);
  }

  sendSms() {
    this
      .$http
      .post('/sms', this.data)
      .then(({ data: message }) => this.message = message);
  }

  saveAsDraft() {
    this
      .$http
      .post('/drafts')
      .then(({ data: message }) => this.message = message);
  }

  bindData(data, field) {
    this.data[field] = data;
  }

}

export default SendSmsController;
