/**
 * Created by Manjesh on 11-02-2017.
 */
import { User } from './../../conn/sqldb';

export function auth(reqArg, res, next) {
  const req = reqArg;
  const token = (req.query.access_token
  || (req.get('Authorization') || '').replace(/Bearer/g, '').trim() || null);
  if (token && token.length >= 10) {
    return User.find({
      where: {
        mobile: new Buffer(token.trim(), 'base64').toString('ascii'),
      },
      attributes: ['id', 'mobile', 'name'],
      raw: true,
    }).then(user => {
      req.user = user;
      return next();
    });
  }
  return res.json({
    code: 400,
    error: 'invalid_request',
    error_description: 'The access token was not found',
  });
}
