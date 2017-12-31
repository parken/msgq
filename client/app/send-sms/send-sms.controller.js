class SendSmsController {
  /* @ngInject */
  constructor($http, $state, $stateParams,Session, $timeout, TransliterationControl, ScheduleSms, defaultService, toast) {
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.Session = Session;
    this.Math = Math;
    this.$timeout = $timeout;
    this.TransliterationControl = TransliterationControl;
    this.ScheduleSms = ScheduleSms;
    this.defaultService = defaultService;
    this.toast = toast;
  }

  $onInit() {
    this.langs = [{ name: 'English', val: 0 }, { name: 'Unicode', val: 1 }];
    this.numbers = this.$stateParams.contacts || '9844717202';
    this.selectedGroups = '';
    this.contactCounts = 0;
    this.user = this.Session.read('userinfo');
    this.data = {
      numbersList: [],
      senderId: 'PARKEN',
      message: '',
      text: 'Hello Parken on ' + new Date(),
      campaign: 'My Campaign on ' + new Date(),
      unicode: 0,
      routeId: 1,
    }; //body of Api

    this.senderIdLength = 0;
    this.change = () => {
      this.senderIdLength = document.querySelector('#senderId').value.length;
    };

    this.error = {};
    this.routeIndex = 1;
    this.numberPattern = /[987]{1}\d{9}/;
    this.routes = [];
    //create default list in local storage
    this.defaultService.createDefaultStorate();
    this.getRoutes();
    this.translation('true');
  }

  getRoutes() {
    const { token, domain } = this.Session.read('userinfo');
    this
      .defaultService
      .loadCredits(token, domain)
      .then(routes => {
        this.routes = routes;
        this.data.routeId = this.routes[0].id;
      })
      .catch((err) => {

      })
  }

  setRoute(id) {
    this.data.routeId = id;
  }

  translation(unicode) {
    if (unicode === 'true') {
      // Load the Google Transliterate API
      this.$timeout(() => {
        // Enable transliteration in the textbox with id
        // 'transliterateTextarea'.
        this.TransliterationControl.makeTransliteratable(['transliterateTextarea']);
        this.TransliterationControl.showControl('translControl');
      }, 0);
    } else {
      console.log('engilsh')
    }
  }

  loadPreviousMsg() {
    const lastMsg = this.Session.read(this.defaultService.getServiceName()).lastMsg;
    Object.assign(this.data, lastMsg);
  }

  validateNumbers() {
    if (!this.numbers) return;
    const numbers = this.numbers.replace(/\n/g, ',').split(',');

    const numbersList = [];
    numbers.forEach(n => {
      const reg = n.match(this.numberPattern);
      if (numbersList.includes(n) || !reg) {
        this.foundInvalidNumber = true;
        return;
      }
      numbersList.push(n);
    });
    this.numbers = numbers.join(',');
    if (this.foundInvalidNumber) {
      this.error.numberError = 'Some numbers were invalid/duplicate and were removed.';
    } else this.data.numbers = numbersList.join(',');
  }

  sendSms() {
    const config = this.Session.read(this.defaultService.getServiceName()) || {};
    const { senderId, text, campaign, routeId } = this.data;
    Object.assign(config, {
      sender: this.data.senderId,
      type: 1,
      sms: text,
      number: this.numbers,
      route: routeId,
      domain: this.user.domain,
      token: this.user.token,
    });
    config.lastMsg = { senderId, text, campaign, signature: this.signature };
    this.Session.create(this.defaultService.getServiceName(), config);
    this.saveMessageDetails(config);
    const { domain, token, number, route, type, sms, sender } = config;
    return this
      .$http
      .get(`http://${domain}/httpapi/httpapi` , {
        params: { token, number, route, type, sender, sms },
      })
      .then(() => {
        this.toast.show('success', `Message send successfully to ${config.number}`);
        this.saveMessageDetails(config);
      })
      .catch(err => {
        const isCode = isNaN(Number(err));
        if (!isCode) {
          this.saveMessageDetails(config);
          return this.toast.show('success', `SMS sent successfully`);
        }
        return this.toast.show('error',  `Could not send message`)
      });
  }

  saveMessageDetails() {
    [ 'senderId', 'campaign', 'text' ].forEach(x => {
      const config = this.Session.read(this.defaultService.getServiceName());
      let current = config.lists[x] || [];
      const found = current.some(y => (y.name === this.data[x]));
      if (!found) {
        current.push({ name: this.data[x] });
        config.lists[x] = current;
        this.Session.create(this.defaultService.getServiceName(), config);
      }
    });
  }

  addSignature() {
    const config = this.Session.read(this.defaultService.getServiceName());
    config.isSignature = this.isSignature;
    this.Session.create(this.defaultService.getServiceName(), config);
  }

  saveSignature() {
    const config = this.Session.read(this.defaultService.getServiceName());
    config.signature = this.signature;
    this.Session.create(this.defaultService.getServiceName(), config);
  }

  getSignature() {
    const config = this.Session.read(this.defaultService.getServiceName());
    this.signature = config.signature;
    this.isSignature = config.isSignature;
  }

  loadSenderIds() {
    Object.assign(this, this.defaultService.loadConfig('senderId'));
  }

  loadTemplates() {
    Object.assign(this, this.defaultService.loadConfig('text'));
  }

  loadCampaigns() {
    Object.assign(this, this.defaultService.loadConfig('campaign'));
  }

  saveAsDraft() {
    this
      .$http
      .post('/drafts')
      .then(({ data: message }) => (this.message = message));
  }

  bindData(item, field) {
    this.contactCounts = 0;
    switch (field) {
      case 'groupId': {
        const selectedGrps = this.list.filter(x => x.isChecked);
        this.data.groupId = selectedGrps.map(x => x.id).join(',');
        this.selectedGroups = selectedGrps.map((x) => {
          this.contactCounts+= x.count;
          return x.name;
        });
        break;
      }
      default:
        this.data[field] = item.name;
    }
  }
}

export default SendSmsController;
