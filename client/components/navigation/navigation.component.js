import template from './navigation.pug';
import controller from './navigation.controller';

const NavigationComponent = {
  template,
  controller,
  bindings: { settings: '=' },
};

export default NavigationComponent;
