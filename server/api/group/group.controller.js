
import db from '../../conn/sqldb';

import { ROLES } from '../../config/constants';

const { ADMIN } = ROLES;

export function index(req, res, next) {
  if (req.user.roleId !== ADMIN) {
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
      .catch(next);
  }

  const { limit = 20, offset = 0, fl, where } = req.query;

  const options = {
    attributes: fl ? fl.split(',') : ['id', 'name'],
    limit,
    offset,
  };

  if (where) {
    options.where = where.split(',').reduce((nxt, x) => {
      const [key, value] = x.split(':');
      return Object.assign(nxt, { [key]: value });
    }, {});
  }

  return Promise
    .all([
      db.Group
        .findAll(options),
      db.Group
        .count(),
    ])
    .then(([groups, numFound]) => res.json({ items: groups, meta: { numFound } }))
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

export function show(req, res, next) {
  return db.Group
    .findById(req.params.id)
    .then(group => res.json(group))
    .catch(next);
}

export function create(req, res, next) {
  const { name } = req.body;
  if (!name) return res.status(500).json({ message: 'Invalid request' });
  return db.Group
    .create(Object.assign({}, req.body, {
      userId: req.user.id,
    }))
    .then(({ id }) => res.status(201).json({ id }))
    .catch(next);
}

export function update(req, res, next) {
  return db.Group
    .update(
      Object.assign({}, req.body),
      { where: { id: req.params.id } })
    .then(() => res.status(201).end())
    .catch(next);
}

export function destroy(req, res, next) {
  return db.Group
    .destory({ where: { id: req.params.id } })
    .then(() => res.status(201).end())
    .catch(next);
}
