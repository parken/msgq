import db from '../../conn/sqldb';

export function index(req, res, next) {
  return db.Domain
    .findAll({ where: { userId: req.user.id } })
    .then(data => res.json(data))
    .catch(next);
}

export function create(req, res, next) {
  const { name, classkey, price, existing } = req.body;
  return db.Domain
    .create({ name, classkey, price, existing, status: 1, userId: req.user.id })
    .then(data => res.json(data))
    .catch(next);
}
