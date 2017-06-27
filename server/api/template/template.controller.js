import logger from '../../components/logger';
import db from '../../conn/sqldb';

function handleError(res, argStatusCode, err) {
  logger.error('user.controller', err);
  const statusCode = argStatusCode || 500;
  res.status(statusCode).send(err);
}

export function index(req, res) {
  return db.Template
    .findAll({
      attributes: ['id', 'name', 'content'],
      where: { userId: req.user.id },
    })
    .then(data => res.json(data))
    .catch(err => handleError(res, 500, err));
}
