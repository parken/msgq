import logger from '../../components/logger';
import db from '../../conn/sqldb';

function handleError(res, argStatusCode, err) {
  logger.error('user.controller', err);
  const statusCode = argStatusCode || 500;
  res.status(statusCode).send(err);
}

function updateContacts(contacts, userId) {
  const contact = contacts.shift();
  if (contact) {
    const { name, number } = contact;
    return db.Contact.find({ where: { number, userId } })
      .then(item => (item
        ? item.update({ name })
        : db.Contact.create({ name, number, userId })))
      .then(() => updateContacts(contacts, userId))
      .catch(() => updateContacts(contacts, userId));
  }
  return Promise.resolve();
}

export function syncContact(req, res) {
  return updateContacts(req.body.contacts, req.user.id)
    .then(() => res.end())
    .catch(err => handleError(res, 500, err));
}
