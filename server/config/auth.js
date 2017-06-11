/**
 * Created by Manjesh on 11-04-2017.
 */

import db, { App, RefreshToken, Session } from '../conn/sqldb';

export function authorise(req, res) {
  return App
    .findOne({
      where: {
        clientId: req.query.client_id,
        redirectUri: req.query.redirect_uri,
      },
      attributes: ['id', 'name'],
    })
    .then(model => {
      if (!model) return res.status(404).json({ error: 'Invalid Client' });
      return res.json(model);
    })
    .catch(err => res.status(400).json(err));
}

export function logout(req, res, next) {
  RefreshToken
    .find({
      attributes: ['sessionId'],
      where: {
        refreshToken: req.body.token,
      },
      raw: true,
    })
  .then((s) => (s && s.sessionId ? Session.logout(db, s.sessionId) : Promise.resolve()))
  .then(s => res.json(s))
  .catch(next);
}
