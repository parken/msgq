import template from './contact-new.pug';
import controller from './contact-new.service';

const ContactNewComponent = {
  template,
  controller,
  bindings: { list: '=' },
};

export default ContactNewComponent;
