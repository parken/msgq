import db from '../../conn/sqldb/index';

export function index(req, res, next) {
  const { limit = 20, offset = 0, fl, where } = req.query;

  const options = {
    where: {},
    attributes: fl ? fl.split(',') : ['id', 'number'],
    limit,
    offset,
  };

  if (where) {
    options.where = where.split(',').reduce((nxt, x) => {
      const [key, value] = x.split(':');
      return Object.assign(nxt, { [key]: value });
    }, {});
  }

  if (req.params.messageFlyId) options.where.messageFlyId = req.params.messageFlyId;

  return Promise
    .all([
      db.Message
        .findAll(options),
      db.Message
        .count(),
    ])
    .then(([routes, numFound]) => res.json({ items: routes, meta: { numFound } }))
    .catch(next);
}

export function show(req, res, next) {
  return db.Message
    .findById(req.params.id)
    .then(route => res.json(route))
    .catch(next);
}
