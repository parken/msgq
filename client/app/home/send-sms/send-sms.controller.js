class SendSmsController {
  /* @ngInject */
  constructor($state, Session) {
    this.$state = $state;
    this.Session = Session;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.data = {
      numbersList: [],
    }; //body of Api
    this.error = {};
    this.numberPattern = /[987]{1}\d{9}/;
    this.tabs = ['Promotional Route', 'Transactional Route'];
    this.tabIndex = 0;
  }

  validateNumbers() {
    if (!this.numbers) return;
    const numbers = this.numbers.replace(/\n/g, ',').split(',');

    numbers.forEach(n => {
      debugger;
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
}

export default SendSmsController;
