import template from './export.pug';

class ExportController {
  /* @ngInject */
  constructor(Session, urls) {
    this.Session = Session;
    this.urls = urls;
  }

  $onInit() {
    this.oauth = this.Session.read('oauth');
    const token = this.oauth.access_token;
    this.exportLink = `${this.urls.API_SERVER}/api/${this.type}/download?access_token=${token}`;
  }

}


const CreateGroupComponent = {
  template,
  controller: ExportController,
  bindings: { type: '@' },
};

export default CreateGroupComponent;
