import template from './view-campaign.pug';
class ViewCampaignController {
  /* @ngInject */
  constructor($http, $stateParams, $state, Session, Enum, toast) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.Session = Session;
    this.Enum = Enum;
    this.routes = this.Enum.routes;
    this.toast = toast;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.data = {};
    this.get();
  }

  get() {
    const {id} = this.$stateParams;
    if (!id) return;
    this
      .$http
      .get(`/campaigns/${id}`)
      .then(({data}) => this.data = data)
      .catch(this.toast.next);
  }
}

const ViewCampaignComponent = {
  template,
  controller: ViewCampaignController,
};

export default ViewCampaignComponent;

