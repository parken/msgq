class SendSmsController {
  /* @ngInject */
  constructor($http, $state, $stateParams,Session, $scope, $timeout, TransliterationControl, ScheduleSms, liveair, toast) {
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.Session = Session;
    this.Math = Math;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.TransliterationControl = TransliterationControl;
    this.ScheduleSms = ScheduleSms;
    this.liveair = liveair;
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
      text: 'HEllo' + new Date(),
      campaign: 'MyCampaign' + new Date(),
      unicode: 0,
    }; //body of Api

    this.senderIdLength = 0;
    this.change = () => {
      this.senderIdLength = document.querySelector('#senderId').value.length;
    };

    this.error = {};
    this.routeIndex = 1;
    this.numberPattern = /[987]{1}\d{9}/;
    this.routes = [];
    this.getRoutes();

    this.translation('true');
  }

  getRoutes() {
    const { token, domain } = this.Session.read('liveair');
    this
      .liveair
      .loadCredits(token, domain)
      .then(routes => {
        this.routes = routes;
        this.data.routeId = this.routes[0].id;
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
    const config = this.Session.read('liveair');
    const { text, routeId } = this.data;
    Object.assign(config, {
      sender: this.data.senderId,
      type: 1,
      sms: text,
      number: this.numbers,
      route: routeId,
    });

    this
      .liveair
      .send(config)
      .then(data => {
        [ 'senderId', 'campaign', 'text' ].forEach(x => {
          let current = config.lists[x] || [];
          const found = !current.some(y => (y.name === this.data[x]));
          const allowed = found && ['senderId', 'campaign'].includes(x);
          if (!allowed) {
            current.push({ name: this.data[x] });
            config.lists[x] = current;
            this.Session.create('liveair', config);
          }
        });
        this.toast.show('success', '', `Message send successfully to ${config.number}`);
      })
      .catch(err => this.toast.show('', '', `Could not send message to ${config.number}`));
  }

  loadSenderIds() {
    Object.assign(this, this.liveair.loadConfig('senderId'));
  }

  loadTemplates() {
    Object.assign(this, this.liveair.loadConfig('text'));
  }

  loadCampaigns() {
    Object.assign(this, this.liveair.loadConfig('campaign'));
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
