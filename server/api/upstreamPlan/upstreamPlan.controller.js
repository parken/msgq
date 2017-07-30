import logger from '../../components/logger/index';
import db from '../../conn/sqldb/index';

export function index(req, res, next) {
  const { limit = 20, offset = 0, fl, where } = req.query;

  const options = {
    where: {},
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

  if (req.params.upstreamId) options.where.upstreamId = req.params.upstreamId;

  return Promise
    .all([
      db.UpstreamPlan
        .findAll(options),
      db.UpstreamPlan
        .count(),
    ])
    .then(([upstreams, numFound]) => res.json({ items: upstreams, meta: { numFound } }))
    .catch(next);
}
