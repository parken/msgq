import db from '../../conn/sqldb';
import config from '../../config/environment';
import { notifyOnUserChannel } from '../../components/notify';

function notifyAdminSenderIdApproval(senderId) {
  return db.User.find({ where: { admin: 2 } })
    .then((user) => {
      if (!user) return Promise.reject({ message: 'No admin user found' });
      const text = `Request to approve ${senderId.name} - ${senderId.company}. ${
        config.PLAY_URL}/senderId/${senderId.id}`;
      return notifyOnUserChannel({ userId: user.id, text });
    });
}

const SenderId = {
  createSenderId(senderId, userId) {
    return db.SenderId.findAll({ where: { name: senderId } })
      .then(senderIds => {
        let promise;
        const newObj = { createdBy: userId, updatedBy: userId, name: senderId };
        if (!senderIds.length) promise = db.SenderId.create(newObj);

        const blockedSenderId = senderIds.filter(x => (x.status === 3))[0];
        const approvedSenderId = senderIds.filter(x => (x.status === 2))[0];
        if (!blockedSenderId && approvedSenderId) {
          promise = db.SenderId.create(Object.assign(newObj, {
            status: approvedSenderId.status,
          }));
        }
        if (!promise) promise = db.SenderId.create(newObj);
        return promise
          .then(data => {
            notifyAdminSenderIdApproval(senderId);
            return Promise.resolve(data);
          });
      });
  },
  getSenderId(senderId, userId) {
    return db.SenderId.find({
      attributes: ['id', 'name', 'status'],
      where: { name: senderId, createdBy: userId },
    }).then(userSenderId => {
      if (!userSenderId) return SenderId.createSenderId(senderId, userId);
      return Promise.resolve(userSenderId);
    })
      .catch(err => console.log(err));
  },
};

export default SenderId;
