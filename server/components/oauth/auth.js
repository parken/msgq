import db from '../../conn/sqldb';
import oauth from './index';

export default function () {
  return oauth.authorise();
}

export function logout(req, res, next) {
  db.RefreshToken
    .find({
      attributes: ['sessionId'],
      where: {
        refreshToken: req.body.token,
      },
      raw: true,
    })
    .then(s => (s && s.sessionId ? db.Session.logout(db, s.sessionId) : Promise.resolve()))
    .then(s => res.json(s))
    .catch(next);
}
