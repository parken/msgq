import logger from '../../components/logger/index';
import db from '../../conn/sqldb/index';

function handleError(res, argStatusCode, err) {
  logger.error('user.controller', err);
  const statusCode = argStatusCode || 500;
  res.status(statusCode).send(err);
}


export function index(req, res, next) {
  const { limit = 20, offset = 0, fl } = req.query;
  return db.Upstream
    .findAll({
      limit,
      offset,
    })
    .then(upstreams => res.json(upstreams))
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

export function update(req, res, next) {
  return db.Upstream
    .update(Object
      .assign({}, req.body, { updatedBy: req.user.id }), { where: { id: req.params.id } })
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
  const {count} = req.body;
  if (!count || req.user.roleId !== 1) return res.status(404).json({message: 'Invalid Request'});
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
