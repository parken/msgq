import template from './send-sms.pug';
import controller from './send-sms.controller';

const SendSsmComponent = {
  template,
  controller,
  bindings: { settings: '=' },
};



export default SendSsmComponent;
