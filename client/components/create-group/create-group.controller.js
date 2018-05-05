class CreateGroupController {
  /* @ngInject */
  constructor($state, $http, Session, defaultService) {
    this.$state = $state;
    this.$http = $http;
    this.Session = Session;
    this.defaultService = defaultService;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.groups = [];
    this.getGroups();
  }

  getGroups() {
    const config = this.Session.read(this.defaultService.getServiceName());
    this.groups = config.groups || [];
  }

  createGroup(name) {
    debugger;
    if (!name) return;
    const config = this.Session.read(this.defaultService.getServiceName());
    const id = (config.groups && config.groups.length) || 0;
    this.groups.push({ id, name, count: 0, contact: [] });
    config.groups = this.groups;
    this.groupName = '';
    this.isCreateGrp = false;
    this.Session.create(this.defaultService.getServiceName(), config);
    this.getGroups();
  }

  esc(event) {
    if (event.keyCode === 27) this.isCreateGrp = false;
  }
}

export default CreateGroupController;




/*
*
*
*
* */
