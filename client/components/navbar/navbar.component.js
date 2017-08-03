import template from './navbar.pug';
import controller from './navbar.controller';

const NavbarComponent = {
  template,
  controller,
  bindings: { settings: '=' },
};

export default NavbarComponent;
