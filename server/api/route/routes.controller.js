import logger from '../../components/logger/index';
import { getRouteType } from '../../conn/sqldb/helper';
import db from '../../conn/sqldb/index';

function handleError(res, argStatusCode, err) {
  logger.error('user.controller', err);
  const statusCode = argStatusCode || 500;
  res.status(statusCode).send(err);
}

export function index(req, res) {
  return db.Route.findAll()
    .then(routes => res.json(routes.filter(x =>
      req.user[`${req.user.roleId === 4 ? 'selling' : 'sending'}Balance${getRouteType(x.id)}`])))
    .catch(err => handleError(res, 500, err));
}
