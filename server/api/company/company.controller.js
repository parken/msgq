import logger from '../../components/logger';
import db from '../../conn/sqldb';

function handleError(res, argStatusCode, err) {
  logger.error('user.controller', err);
  const statusCode = argStatusCode || 500;
  res.status(statusCode).send(err);
}

export function show(req, res) {
  return db.User
    .find({
      attributes: [
        'id',
        ['companyName', 'name'],
        ['companyLogo', 'logo'],
        'supportName',
        'supportMobile',
        'supportEmail',
        'loginUrl',
      ],
      where: { loginUrl: req.origin || 'msgque.com' },
    })
    .then((company) => {
      if (!company) return res.status(404).json({ message: 'Invalid Request' });
      return res.json(company);
    })
    .catch((err) => handleError(res, 500, err));
}
