class ContactNewController {
  /* @ngInject */
  constructor($http, $state, Session, $uibModalInstance) {
    this.$http = $http;
    this.$state = $state;
    this.Session = Session;
    this.$uibModalInstance = $uibModalInstance;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.data = {};
    this.selectedGroups = [];
    this.hiddenIds = [];
    this.$http.get('/groups')
      .then(({ data }) => (this.groups = data));
  }

  addToGroup(gid) {
    const [objArr] = this.groups.filter((g) => (g.id === gid && g));
    if (!objArr) return;
    this.hiddenIds.push(gid);
    this.selectedGroups.push(objArr);
    this.groups = this.groups.filter((g) => (g.id !== gid && g));
  }

  removeGroup(index) {
    const obj = this.selectedGroups[index];
    this.selectedGroups.splice(index, 1);
    this.groups.push(obj);
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
