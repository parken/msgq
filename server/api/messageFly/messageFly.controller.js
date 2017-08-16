import { ROLES } from '../../config/constants';

const { ADMIN } = ROLES;
import db from '../../conn/sqldb';

export function index(req, res, next) {
  if (req.user.roleId !== ADMIN) {
    return db.MessageFly
      .findAll({
        attributes: ['id', 'text', 'groupIds', 'numbers', 'total', 'success', 'fail', 'unicode',
          'flash', 'scheduledOn'],
        where: { userId: req.user.id },
        include: [
          { attributes: ['id', 'name'], model: db.MessageFly },
          { attributes: ['id', 'name'], model: db.SenderId },
          { attributes: ['id', 'name'], model: db.Campaign },
        ],
      })
      .then(data => res.json(data))
      .catch(next);
  }

  const { limit = 20, offset = 0, fl, where } = req.query;

  const options = {
    attributes: fl ? fl.split(',') : ['id', 'text', 'groupIds', 'numbers', 'total', 'success', 'fail', 'unicode',
      'flash', 'scheduledOn'],
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
      db.MessageFly
        .findAll(options),
      db.MessageFly
        .count(),
    ])
    .then(([routes, numFound]) => res.json({ items: routes, meta: { numFound } }))
    .catch(next);
}

export function last(req, res, next) {
  return db.MessageFly
    .findAll({
      attributes: ['id', 'text', 'groupIds', 'numbers', 'total', 'success', 'fail', 'unicode',
        'flash', 'scheduledOn'],
      where: { userId: req.user.id },
      include: [
        { attributes: ['id', 'name'], model: db.MessageFly },
        { attributes: ['id', 'name'], model: db.SenderId },
        { attributes: ['id', 'name'], model: db.Campaign },
      ],
    })
    .then(data => res.json(data))
    .catch(next);
}

export function show(req, res, next) {
  return db.MessageFly
    .findById(req.params.id)
    .then(route => res.json(route))
    .catch(next);
}

export function create(req, res, next) {
  return db.MessageFly
    .create(Object.assign({}, req.body, {
      createdBy: req.user.id,
      updatedBy: req.user.id,
    }))
    .then(({ id }) => res.status(201).json({ id }))
    .catch(next);
}

export function update(req, res, next) {
  return db.MessageFly
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
  return db.MessageFly
    .destory({ where: { id: req.params.id } })
    .then(() => res.status(201).end())
    .catch(next);
}
