/**
 * Main application routes
 */


import errors from './components/errors';
import path from 'path';

import user from './api/user';
import bulk from './api/bulk';
import senderId from './api/senderId';
import company from './api/company';
import contact from './api/contact';
import route from './api/route';

export default function (app) {
  // Insert routes below
  app.use('/api/users', user);
  app.use('/api/bulk', bulk);
  app.use('/api/senderId', senderId);
  app.use('/api/company', company);
  app.use('/api/contacts', contact);
  app.use('/api', route);
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
