import db from '../../conn/sqldb';

export function index(req, res, next) {
  return db.Domain
    .findAll({ where: { userId: req.user.id } })
    .then(data => res.json(data))
    .catch(next);
}

export function create(req, res, next) {
  let domains = req.body;
  if (!(domains instanceof Array)) domains = [domains];
  domains = domains.map(x => Object.assign(x, { status: 1, userId: req.user.id }))
  return db.Domain
    .bulkCreate(domains)
    .then(data => res.json(data))
    .catch(next);
}
