/**
 * Main application routes
 */

import path from 'path';

import errors from './components/errors';

import user from './api/user';
import sms from './api/sms';
import senderId from './api/senderId';
import company from './api/company';
import contact from './api/contact';
import group from './api/group';
import template from './api/template';
import campaign from './api/campaign';
import upstream from './api/upstream';
import upstreamPlan from './api/upstream/plan';
import route from './api/route';
import message from './api/message';
import loginIdentifier from './api/loginIdentifier';
import messageFly from './api/messageFly';
import messageFlyMessage from './api/messageFly/message';
import priorityNumber from './api/priorityNumber';
import transaction from './api/transaction';
import role from './api/role';
import credit from './api/selling';
import sending from './api/sending';
import session from './api/session';
import domain from './api/domain';

export default function (app) {
  // Insert routes below
  app.use('/api/users', user);
  app.use('/api/roles', role);
  app.use('/api/messages', message);
  app.use('/api/sms', sms);
  app.use('/api/senderId', senderId);
  app.use('/api/senderIds', senderId);
  app.use('/api/company', company);
  app.use('/api/contacts', contact);
  app.use('/api/routes', route);
  app.use('/api/groups', group);
  app.use('/api/templates', template);
  app.use('/api/campaigns', campaign);
  app.use('/api/upstreams', upstream, upstreamPlan);
  app.use('/api/messageFly', messageFly);
  app.use('/api/messageFlies', messageFly, messageFlyMessage);
  app.use('/api/transactions', transaction);
  app.use('/api/loginIdentifiers', loginIdentifier);
  app.use('/api/priorityNumbers', priorityNumber);

  app.use('/api/sending', sending);
  app.use('/api/credits', credit);
  app.use('/api/sessions', session);
  app.use('/api/domains', domain);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
