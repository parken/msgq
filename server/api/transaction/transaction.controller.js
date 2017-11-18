
import db from '../../conn/sqldb/index';

export function index(req, res, next) {
  const { limit = 20, offset = 0, fl, where } = req.query;

  const options = {
    attributes: fl ? fl.split(',') : ['id'],
    limit: Number(limit),
    offset: Number(offset),
  };

  if (where) {
    options.where = where.split(',').reduce((nxt, x) => {
      const [key, value] = x.split(':');
      return Object.assign(nxt, { [key]: value });
    }, {});
  }

  return Promise
    .all([
      db.Transaction
        .findAll(options),
      db.Transaction
        .count(),
    ])
    .then(([transactions, numFound]) => res.json({ items: transactions, meta: { numFound } }))
    .catch(next);
}

