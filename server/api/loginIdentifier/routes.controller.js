import db from '../../conn/sqldb';

export function index(req, res, next) {
  const { limit = 20, offset = 0, fl, where } = req.query;

  const options = {
    attributes: fl ? fl.split(',') : ['id', 'userId', 'uuid'],
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
      db.LoginIdentifier
        .findAll(options),
      db.LoginIdentifier
        .count(),
    ])
    .then(([routes, numFound]) => res.json({ items: routes, meta: { numFound } }))
    .catch(next);
}

export function show(req, res, next) {
  return db.LoginIdentifier
    .findById(req.params.id)
    .then(route => res.json(route))
    .catch(next);
}

export function create(req, res, next) {
  return db.LoginIdentifier
    .create(Object.assign({}, req.body, {
      userId: req.user.id,
    }))
    .then(({ id }) => res.status(201).json({ id }))
    .catch(next);
}

export function update(req, res, next) {
  return db.LoginIdentifier
    .update(
      Object.assign({}, req.body),
      { where: { id: req.params.id } })
    .then(() => res.status(201).end())
    .catch(next);
}

export function destroy(req, res, next) {
  return db.LoginIdentifier
    .destory({ where: { id: req.params.id } })
    .then(() => res.status(201).end())
    .catch(next);
}
