import template from './view-message-fly.pug';
class ViewMessageFlyController {
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
      .get(`/messageFlys/${id}`)
      .then(({data}) => this.data = data)
      .catch(this.toast.next);
  }
}

const ViewMessageFlyComponent = {
  template,
  controller: ViewMessageFlyController,
};

export default ViewMessageFlyComponent;

