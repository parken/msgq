import { User } from '../../conn/sqldb';
import logger from '../../components/logger';

function handleError(res, argStatusCode, err) {
  logger.error('user.controller', err);
  const statusCode = argStatusCode || 500;
  res.status(statusCode).send(err);
}

export function index(req, res) {
  return res.json();
}

export function show(req, res) {
  return User
    .find({ where: { id: req.params.id } })
    .then(data => res.json(data))
    .catch(err => handleError(res, 500, err));
}
