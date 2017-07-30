
import db from '../../conn/sqldb/index';

export function index(req, res, next) {
  const { limit = 20, offset = 0, fl, where } = req.query;

  const options = {
    attributes: fl ? fl.split(',') : ['id', 'routeId', 'limit', 'userId'],
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
      db.Sending
        .findAll(options),
      db.Sending
        .count(),
    ])
    .then(([routes, numFound]) => res.json({ items: routes, meta: { numFound } }))
    .catch(next);
}

export function create(req, res, next) {
  return db.Sending
    .create(Object.assign({}, req.body, {
      createdBy: req.user.id,
      updatedBy: req.user.id,
    }))
    .then(({ id }) => res.status(201).json({ id }))
    .catch(next);
}
