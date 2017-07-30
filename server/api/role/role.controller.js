
import db from '../../conn/sqldb';

export function index(req, res, next) {
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
      db.Role
        .findAll(options),
      db.Role
        .count(),
    ])
    .then(([groups, numFound]) => res.json({ items: groups, meta: { numFound } }))
    .catch(next);
}

export function show(req, res, next) {
  return db.Role
    .findById(req.params.id)
    .then(group => res.json(group))
    .catch(next);
}

export function create(req, res, next) {
  const { number } = req.body;
  if (!number) return res.status(500).json({ message: 'Invalid request' });
  return db.Role
    .create(Object.assign({}, req.body, {
      userId: req.user.id,
    }))
    .then(({ id }) => res.status(201).json({ id }))
    .catch(next);
}

export function update(req, res, next) {
  return db.Role
    .update(
      Object.assign({}, req.body),
      { where: { id: req.params.id } })
    .then(() => res.status(201).end())
    .catch(next);
}

export function destroy(req, res, next) {
  return db.Role
    .destory({ where: { id: req.params.id } })
    .then(() => res.status(201).end())
    .catch(next);
}
