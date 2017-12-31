class ContactNewController {
  /* @ngInject */
  constructor($http, $state, Session, $uibModalInstance, defaultService) {
    this.$http = $http;
    this.$state = $state;
    this.Session = Session;
    this.$uibModalInstance = $uibModalInstance;
    this.defaultService = defaultService;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.data = {};
    this.selectedGroups = [];
    this.hiddenIds = [];
    this.getGroups();
  }

  getGroups() {
    const config = this.Session.read(this.defaultService.getServiceName());
    this.groups = config.groups || [];
  }

  create(gid) {
    if (!name) return;
    const config = this.Session.read(this.defaultService.getServiceName());
    const id = (config.groups.contacts && config.contacts.length) || 0;
    Object.assign($ctrl.data, { id });
    this.groups.contacts.push(this.data);
    config.groups = this.groups;
    this.Session.create(this.defaultService.getServiceName(), config);
  }

  removeGroup(index) {
    const obj = this.selectedGroups[index];
    this.selectedGroups.splice(index, 1);
    this.groups.push(obj);
  }
}

export default ContactNewController;
