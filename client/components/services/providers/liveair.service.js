class LiveAirService {
  /*  @ngInject  */
  constructor($http, $q, Session) {
    this.$http = $http;
    this.$q = $q;
    this.Session = Session;
  }
  send(config) {
    const { domain, token, number, route, type, sms, sender } = config;
    // this.localstaorage.sender.push(sender)
    return this
      .$http
      .get(`http://${domain}/httpapi/httpapi` , {
        params: { token, number, route, type, sms: encodeURIComponent(sms), sender },
      })
      .then(res => res.data);
  }

  loadCredits(token, domain) {
    const map = {
      Promotional: 1,
      Transactional: 2,
      'Sender ID': 3,
      'Trans  OTP': 4,
    };

    // load initial routes on top
    const promiseArr = Object.keys(map).map(x => (this
      .$http
      .get(`http://${domain}/httpapi/credits`, {
        params: { token, route: map[x] },
      })));


    return this
      .$q
      .all(promiseArr)
      .then(data => data.map(x => ({ id: map[x.data[1]], name: x.data[1], balance: x.data[3]})));
  }

  loadConfig(field) {
    this.config = this.Session.read('liveair');
    return {
      field: field,
      list: this.config.lists[field] || [],
    };
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

export default LiveAirService;
