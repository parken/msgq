import logger from '../../components/logger';
import db from '../../conn/sqldb';
import { ROLES } from '../../config/constants';

const { CUSTOMER } = ROLES;

export function index(req, res, next) {
  if (req.user.roleId === CUSTOMER) {
    return db.Template
      .findAll({
        attributes: ['id', 'name', 'content'],
        where: { userId: req.user.id },
      })
      .then(data => res.json(data))
      .catch(next);
  }


  const { limit = 20, offset = 0, fl, where } = req.query;

  const options = {
    attributes: fl ? fl.split(',') : ['id', 'name'],
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
      db.Template
        .findAll(options),
      db.Template
        .count(),
    ])
    .then(([templates, numFound]) => res.json({ items: templates, meta: { numFound } }))
    .catch(next);
}

export function show(req, res, next) {
  return db.Template
    .findById(req.params.id)
    .then(template => res.json(template))
    .catch(next);
}

export function create(req, res, next) {
  return db.Template
    .create(Object.assign({}, req.body, {
      createdBy: req.user.id,
      updatedBy: req.user.id,
    }))
    .then(({ id }) => res.status(201).json({ id }))
    .catch(next);
}

export function activate(req, res, next) {
  const { id } = req.params;
  db.Template
    .findById(id)
    .then(({ routeId }) => db.Template
      .deactivateOtherRoutes(db, { routeId }))
    .then(() => db.Template
      .update({ active: true }, { where: { id } }))
    .then(() => res.status(201).end())
    .catch(next);
}

export function update(req, res, next) {
  return db.Template
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
  return db.Template
    .destory({ where: { id: req.params.id } })
    .then(() => res.status(201).end())
    .catch(next);
}
