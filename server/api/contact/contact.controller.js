import logger from '../../components/logger';
import db from '../../conn/sqldb';

function handleError(res, argStatusCode, err) {
  logger.error('user.controller', err);
  const statusCode = argStatusCode || 500;
  res.status(statusCode).send(err);
}

function updateContacts({ contacts, userId, groupId }) {
  const contact = contacts.shift();
  if (contact) {
    const { name, number, email, birthday } = contact;
    const where = { userId };
    if (number) where.number = number;
    if (email) where.email = email;
    return db.Contact.find({ where })
      .then(item => (item
        ? item.update({ name, email, birthday }).then(() => Promise.resolve([item, false]))
        : db.Contact
          .create({ name, number, userId, email, birthday })
          .then(x => Promise.resolve([x, true]))))
      .then(([{ id: contactId }, created]) => (created
        ? db.GroupContact.create({ groupId, contactId })
        : Promise.resolve()))
      .then(() => updateContacts({ contacts, userId, groupId }))
      .catch(() => updateContacts({ contacts, userId, groupId }));
  }
  return Promise.resolve();
}

export function syncContact(req, res) {
  const { name, contacts } = req.body;
  if (!name || !contacts) return res.status(500).json({ message: 'Invalid Request' });
  db.Group
    .findOrCreate({ where: { name, userId: req.user.id } })
    .then(([group]) => updateContacts({ contacts, userId: req.user.id, groupId: group.id }))
    .then(() => res.end())
    .catch(err => console.log(err));
  return res.end();
}

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
  if (req.params.groupId) options.where = { groupId: req.params.groupId };

  return Promise
    .all([
      db.Contact
        .findAll(options),
      db.Contact
        .count(),
    ])
    .then(([routes, numFound]) => res.json({ items: routes, meta: { numFound } }))
    .catch(next);
}

export function show(req, res, next) {
  return db.Contact
    .findById(req.params.id)
    .then(route => res.json(route))
    .catch(next);
}

export function create(req, res, next) {
  return db.Contact
    .create(Object.assign({}, req.body, {
      createdBy: req.user.id,
      updatedBy: req.user.id,
    }))
    .then(({ id }) => res.status(201).json({ id }))
    .catch(next);
}

export function update(req, res, next) {
  return db.Contact
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
  return db.Contact
    .destory({ where: { id: req.params.id } })
    .then(() => res.status(201).end())
    .catch(next);
}
