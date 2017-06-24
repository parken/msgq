import template from './list-details.pug';
import controller from './list-details.controller';

const ListDetailsComponent = {
  template,
  controller,
  bindings: { list: '=' },
};

export default ListDetailsComponent;
