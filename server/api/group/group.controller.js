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
