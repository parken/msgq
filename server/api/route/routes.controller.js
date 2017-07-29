import logger from '../../components/logger/index';
import { getRouteType } from '../../conn/sqldb/helper';
import db from '../../conn/sqldb/index';
import { ROLES } from '../../config/constants';

const { ADMIN } = ROLES;

function handleError(res, argStatusCode, err) {
  logger.error('user.controller', err);
  const statusCode = argStatusCode || 500;
  res.status(statusCode).send(err);
}

export function index(req, res) {
  return db.Route.findAll()
    .then(routes => res.json(routes.map(x => x.toJSON()).filter(x => {
      const route = x;
      route.balance = req.user[`${req.user.roleId === 4 ? 'selling' : 'sending'
      }Balance${getRouteType(x.id)}`];
      return route.balance;
    })))
    .catch(err => handleError(res, 500, err));
}

export function activeUpstream(req, res, next) {
  if (req.user.roleId !== ADMIN) return next();
  const { routeId } = req.params;
  return db.Upstream
    .scope('active')
    .find({ where: { routeId } })
    .then(({ id }) => res.json({ id }))
    .catch(next);
}
