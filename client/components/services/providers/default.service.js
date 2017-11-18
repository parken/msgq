class DefaultService {
  /*  @ngInject  */
  constructor($http) {
    this.$http = $http;
  }
  send(config) {
    alert('send method missing')
  }
  loadSenderIds() {
    const senderIds = localStorage.get('senderIds');
    return senderIds ? JSON.parse(senderIds) : [];
  }

  loadTemplates() {
    const templates = localStorage.get('templates');
    return templates ? JSON.parse(templates) : [];
  }

  loadCampaigns() {
    const campaigns = localStorage.get('campaigns');
    return campaigns ? JSON.parse(campaigns) : [];
  }

  loadGroups() {
    const groups = localStorage.get('groups');
    return groups ? JSON.parse(groups) : [];
  }
}

export default DefaultService;
