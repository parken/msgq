import logger from '../../../components/logger/index';
import db from '../../../conn/sqldb/index';

export function index(req, res, next) {
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
      db.Upstream
        .findAll(options),
      db.Upstream
        .count(),
    ])
    .then(([upstreams, numFound]) => res.json({ items: upstreams, meta: { numFound } }))
    .catch(next);
}

export function show(req, res, next) {
  return db.Upstream
    .findById(req.params.id)
    .then(upstream => res.json(upstream))
    .catch(next);
}

export function create(req, res, next) {
  return db.Upstream
    .create(Object.assign({}, req.body, {
      createdBy: req.user.id,
      updatedBy: req.user.id,
    }))
    .then(({ id }) => res.status(201).json({ id }))
    .catch(next);
}

export function activate(req, res, next) {
  const { id } = req.params;
  db.Upstream
    .findById(id)
    .then(({ routeId }) => db.Upstream
      .deactivateOtherRoutes(db, { routeId }))
    .then(() => db.Upstream
      .update({ active: true }, { where: { id } }))
    .then(() => res.status(201).end())
    .catch(next);
}

export function update(req, res, next) {
  return db.Upstream
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
  return db.Upstream
    .destory({ where: { id: req.params.id } })
    .then(() => res.status(201).end())
    .catch(next);
}

export function createPlan(req, res) {
  const { count } = req.body;
  if (!count || req.user.roleId !== 1) return res.status(404).json({ message: 'Invalid Request' });
  return db.UpstreamPlan
    .create({
      upstreamId: req.params.id,
      createdBy: req.user.id,
      updatedBy: req.user.id,
      count,
    })
    .then(() => res.status(202).end())
    .catch(err => handleError(res, 500, err));
}
