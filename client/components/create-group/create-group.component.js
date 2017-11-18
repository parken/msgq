import template from './create-group.pug';
import controller from './create-group.controller';

const CreateGroupComponent = {
  template,
  controller,
  bindings: { list: '=' },
};

export default CreateGroupComponent;
