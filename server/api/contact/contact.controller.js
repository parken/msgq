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
