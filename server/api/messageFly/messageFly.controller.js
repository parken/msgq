import db from '../../conn/sqldb';

export function index(req, res, next) {
  return db.MessageFly
    .findAll({
      attributes: ['id', 'text', 'groupIds', 'numbers', 'total', 'success', 'fail', 'unicode',
        'flash', 'scheduledOn'],
      where: { userId: req.user.id },
      include: [
        { attributes: ['id', 'name'], model: db.Route },
        { attributes: ['id', 'name'], model: db.SenderId },
        { attributes: ['id', 'name'], model: db.Campaign },
      ],
    })
    .then(data => res.json(data))
    .catch(next);
}
