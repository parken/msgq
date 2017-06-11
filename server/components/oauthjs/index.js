
import model from './model';

module.exports = require('oauth2-server')({
  model,
  grants: ['authorization_code', 'password', 'refresh_token'],
  debug: true,
});
