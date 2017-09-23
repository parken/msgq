
import db from '../../conn/sqldb/index';

export function index(req, res, next) {
  const { limit = 20, offset = 0, fl, where } = req.query;

  const options = {
    attributes: fl ? fl.split(',') : ['id', 'routeId', 'limit', 'userId', 'createdAt'],
    limit: Number(limit),
    offset: Number(offset),
    include: [{
      model: db.Route,
      attributes: ['id', 'name'],
    }, {
      model: db.User,
      attributes: ['id', 'name', 'email'],
      as: 'FromUser',
    }, {
      model: db.User,
      attributes: ['id', 'name', 'email'],
      as: 'User',
    }],
  };

  if (where) {
    options.where = where.split(',').reduce((nxt, x) => {
      const [key, value] = x.split(':');
      return Object.assign(nxt, { [key]: value });
    }, {});
  }

  return Promise
    .all([
      db.Selling
        .findAll(options),
      db.Selling
        .count(),
    ])
    .then(([routes, numFound]) => res.json({ items: routes, meta: { numFound } }))
    .catch(next);
}

export function create(req, res, next) {
  return db.Selling
    .create(Object.assign({}, req.body, {
      createdBy: req.user.id,
      updatedBy: req.user.id,
      fromUserId: req.user.id,
    }))
    .then(({ id }) => res.status(201).json({ id }))
    .catch(next);
}
