
import { getRouteType } from '../../conn/sqldb/helper';
import db from '../../conn/sqldb/index';
import { ROLES } from '../../config/constants';

const { ADMIN } = ROLES;

export function activeUpstream(req, res, next) {
  if (req.user.roleId !== ADMIN) return next();
  const { routeId } = req.params;
  return db.Upstream
    .scope('active')
    .find({ where: { routeId } })
    .then(({ id }) => res.json({ id }))
    .catch(next);
}

export function index(req, res, next) {
  if (req.user.roleId !== ADMIN) {
    return db.Route.findAll()
      .then(routes => res.json(routes.map(x => x.toJSON()).filter(x => {
        const route = x;
        route.balance = req.user[`${req.user.roleId === 4 ? 'selling' : 'sending'
        }Balance${getRouteType(x.id)}`];
        return route.balance;
      })))
      .catch(next);
  }

  const { limit = 20, offset = 0, fl, where } = req.query;

  const options = {
    attributes: fl ? fl.split(',') : ['id', 'name'],
    limit,
    offset,
  };

  if (where) {
    options.where = where.split(',').reduce((nxt, x) => {
      const [key, value] = x.split(':');
      return Object.assign(nxt, { [key]: value });
    }, {});
  }

  return Promise
    .all([
      db.Route
        .findAll(options),
      db.Route
        .count(),
    ])
    .then(([routes, numFound]) => res.json({ items: routes, meta: { numFound } }))
    .catch(next);
}

export function show(req, res, next) {
  return db.Route
    .findById(req.params.id)
    .then(route => res.json(route))
    .catch(next);
}

export function create(req, res, next) {
  return db.Route
    .create(Object.assign({}, req.body, {
      createdBy: req.user.id,
      updatedBy: req.user.id,
    }))
    .then(({ id }) => res.status(201).json({ id }))
    .catch(next);
}

export function update(req, res, next) {
  return db.Route
    .update(
      Object.assign({}, req.body, {
        active: false,
        updatedBy: req.user.id,
      }),
      { where: { id: req.params.id } })
    .then(() => res.status(201).end())
    .catch(next);
}

export function destroy(req, res, next) {
  return db.Route
    .destory({ where: { id: req.params.id } })
    .then(() => res.status(201).end())
    .catch(next);
}
