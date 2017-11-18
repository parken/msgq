class MSGQService {
  /*  @ngInject  */
  constructor($http) {
    this.$http = $http;
  }
  // sendSms() {
  //   this
  //     .$http
  //     .post('/sms', this.data)
  //     .then(({ data: message }) => this.message = message);
  // }

  loadSenderIds() {
    //load SenderIds on focus of message field
    this.field = 'senderId';
    this
      .$http
      .get('/senderId', { params: { fl: 'id,name,senderIdStatusId', status: '1,2' } })
      .then(({ data: senderIds }) => {
        this.list = this.senderIds = senderIds;
        if (!this.data.senderId && this.senderIds.length) {
          this.data.senderId = this.senderIds[0].name;
        }
      });
  }

  loadTemplates() {
    //load templates on focus of message field
    this.field = 'text';
    this
      .$http
      .get('/templates')
      .then(({ data: templates }) => (this.list = templates.items || templates));
  }

  loadCampaigns() {
    //load Campaigns on focus of message field
    this.field = 'campaign';
    this
      .$http
      .get('/campaigns')
      .then(({ data: campaigns }) => (this.list = campaigns.items || campaigns));
  }

  loadGroups() {
    //load initial Groups
    this.field = 'groupId';
    this
      .$http
      .get('/groups')
      .then(({ data: groups }) => (this.list = groups.items || groups));
  }


}

export default MSGQService;
