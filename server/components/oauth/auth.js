import db from '../../conn/sqldb';
import oauth from './index';

function tokenAuthentication(token, r, res, next) {
  const req = r;
  return db.LoginIdentifier
    .find({
      where: { uuid: token },
      include: [{
        model: db.User,
        attributes: [
          'id', 'name', 'roleId', 'admin', 'resellerId', 'sellingBalanceTransactional',
          'sendingBalanceTransactional', 'sellingBalancePromotional', 'sendingBalancePromotional',
          'sellingBalanceSenderId', 'sendingBalanceSenderId', 'sellingBalanceOTP',
          'sendingBalanceOTP',
        ],
      }],
    })
    .then(data => {
      const { User: user } = data || {};
      if (!user) {
        return res.status(400).json({
          code: 400,
          error: 'invalid_request',
          error_description: 'The access token was not found',
        });
      }
      req.user = user;
      return next();
    });
}

export default function (req, res, next) {
  const authorization = req.get('Authorization');
  if (req.query.token) {
    return tokenAuthentication(req.query.token, req, res, next);
  } else if (authorization && authorization.toLowerCase().startsWith('token')) {
    return tokenAuthentication(authorization.toLowerCase().split('token ')[1], req, res, next);
  }
  return oauth.authorise()(req, res, next);
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
