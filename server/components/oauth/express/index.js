
import authorise from './authorise';
import oAuth from './../';

export default function (app, routes) {
  app.oauth = oAuth;
  // OAuth Token authorization_code, password, refresh_token
  app.all('/oauth/token', app.oauth.grant());
  app.all('/api/oauth/token', app.oauth.grant());

  // app.use(app.oauth.authorise('main'));

  // OAuth Authorise from Third party applications
  app.get('/authorise', authorise);

  app.post('/authorise', app.oauth.authCodeGrant((req, callback) => {
    if (req.body.allow !== 'true') return callback(null, false);
    return callback(null, true, req.user);
  }));
  // OAuth Authorise from Third party applications
  routes.default(app);
  app.use(app.oauth.errorHandler());
}
