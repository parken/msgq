import logger from '../../components/logger';
import db from '../../conn/sqldb';

function handleError(res, argStatusCode, err) {
  logger.error('user.controller', err);
  const statusCode = argStatusCode || 500;
  res.status(statusCode).send(err);
}

export function index(req, res) {
  return db.Group
    .findAll({
      attributes: ['id', 'name'],
      where: { userId: req.user.id },
    })
    .then(groups => db.GroupContact
      .findAll({
        attributes: ['groupId', [db.sequelize.fn('COUNT', 'contactId'), 'count']],
        where: { groupId: groups.map(x => x.id) },
        group: 'groupId',
      }).then(groupsContactCount => res.json(groups.map((x) => {
        const group = x.toJSON();
        let contact = groupsContactCount.filter(y => (y.groupId === group.id))[0];
        if (contact) contact = contact.toJSON();
        else contact = { count: 0 };
        group.count = contact.count;
        return group;
      }))))
    .catch(err => handleError(res, 500, err));
}

export function create(req, res, next) {
  const { name } = req.body;
  if (!name) return res.status(500).json({ message: 'Invalid request' });
  return db.Group
    .create({ name, userId: req.user.id })
    .then(data => res.json(data))
    .catch(next);
}

export function addEmailToGroup(req, res, next) {
  return db.Group.find({ where: { name: req.params.name } })
    .then(group => {
      if (!group) return res.status(500).json({ message: 'no group found.' });
      return db.GroupEmail
        .findOrCreate({ where: { groupId: group.id, email: req.params.email } })
        .then(() => res.status(202).end());
    }).catch(err => console.log(err));
}
