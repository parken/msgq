import logger from '../../components/logger';
import config from '../../config/environment';
import { notifyOnUserChannel } from '../../components/notify';
import db from '../../conn/sqldb';

function handleError(res, argStatusCode, err) {
  console.log(err)
  logger.error('user.controller', err);
  const statusCode = argStatusCode || 500;
  res.status(statusCode).send(err);
}

function notifyAdminSenderIdApproval(senderId) {
  return db.User.find({ where: { admin: 2 } })
    .then((user) => {
      if (!user) return Promise.reject({ message: 'No admin user found' });
      const text = `Request to approve ${senderId.name} - ${senderId.company}. ${
        config.PLAY_URL}/senderId/${senderId.id}`;
      return notifyOnUserChannel({ userId: user.id, text });
    });
}

export function create(req, res) {
  return db.SenderId
    .findAll({
      attributes: ['id', 'status', 'createdBy'],
      where: { name: req.body.name, createdBy: req.user.id },
    }).then((senderIds) => {
      const userSenderId = senderIds.filter(x => (x.createdBy === req.user.id))[0];
      if (userSenderId) {
        if (userSenderId.status === 1) {
          return res.json({ message: 'Approval Pending.' });
        }
        if (userSenderId.status === 2) {
          return res.status(500).json({ message: 'Blocked.' });
        }
        return res.status(500).json({ message: 'Duplicate' });
      }
      if (!senderIds.length) {
        return db.SenderId.create(Object
          .assign({}, req.body, { createdBy: req.user.id, updatedBy: req.user.id }))
          .then((senderId) => {
            notifyAdminSenderIdApproval(senderId);
            return res.json({ message: 'success' });
          });
      }
      const blockedSenderId = senderIds.filter(x => (x.status === 3))[0];
      const approvedSenderId = senderIds.filter(x => (x.status === 2))[0];
      if (!blockedSenderId && approvedSenderId) {
        return db.SenderId.create(Object.assign(
          { status: approvedSenderId.status },
          req.body,
          { createdBy: req.user.id, updatedBy: req.user.id }))
          .then((senderId) => {
            notifyAdminSenderIdApproval(senderId);
            return res.json({ message: 'success' });
          });
      }
      return db.SenderId.create(Object.assign(
        {},
        req.body,
        { createdBy: req.user.id, updatedBy: req.user.id }))
        .then((senderId) => {
          notifyAdminSenderIdApproval(senderId);
          return res.json({ message: 'success' });
        });
    })
    .catch((err) => handleError(res, 500, err));
}

export function deleteSenderId(req, res) {
  return db.SenderId.destroy({ where: { id: req.params.id } })
    .then((data) => res.json(data))
    .catch((err) => handleError(res, 500, err));
}

export function index(req, res) {
  let promise;
  if (req.user.admin === 2) {
    promise = Promise.resolve();
  } else if (req.user.admin) {
    promise = db.User.findAll({ attributes: ['id'], where: { loginUrl: req.origin } });
  } else {
    promise = Promise.resolve([req.user]);
  }
  return promise
    .then(users => {
      const where = { id: { $not: 0 } };
      if (users) where.createdBy = users.map(x => x.id);
      return db.SenderId.findAll({
        where,
        include: [{
          model: db.User,
          as: 'CreatedBy',
          attributes: ['id', 'name', 'admin'],
        }] })
        .then(data => res.json(data));
    })
    .catch(err => handleError(res, 500, err));
}

export function show(req, res) {
  let promise;
  if (req.user.admin === 2) {
    promise = Promise.resolve();
  } else if (req.user.admin) {
    promise = db.User.findAll({ attributes: ['id'], where: { loginUrl: req.origin } });
  } else {
    promise = Promise.resolve([req.user]);
  }
  return promise
    .then(users => {
      const where = { id: req.params.id };
      if (users) where.createdBy = users.map(x => x.id);
      return db.SenderId.find({
        where,
        include: [{
          model: db.User,
          as: 'CreatedBy',
          attributes: ['id', 'name', 'admin'],
        }] })
        .then(data => res.json(data));
    })
    .catch(err => handleError(res, 500, err));
}

export function approve(req, res) {
  return db.SenderId.update({ status: true }, { where: { id: req.params.id } })
    .then(() => res.status(202).end())
    .catch(err => handleError(res, 500, err));
}

export function block(req, res) {
  return db.SenderId.update({ status: false }, { where: { id: req.params.id } })
    .then(() => res.status(202).end())
    .catch(err => handleError(res, 500, err));
}
