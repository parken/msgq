import db from '../../conn/sqldb';
import SenderId from '../../components/senderId';
import { getRouteType } from '../../conn/sqldb/helper';

const SmsManager = {
  queue: [],
  processing: false,
  processItem() {
    const [messageId, userId, routeId] = (SmsManager.queue.shift() || '').split(':');
    if (messageId) {
      SmsManager.processing = true;
      console.log(messageId, userId, routeId);
      SmsManager.processing = false;
      return SmsManager.processItem();
    }
    return Promise.resolve();
  },
  startQueue() {
    if (!SmsManager.processing) SmsManager.processItem();
    return Promise.resolve();
  },
  addToSmsQueue(messages) {
    if (!SmsManager.queue) SmsManager.queue = [];
    messages.forEach(x => (SmsManager.queue.includes(`${x.id}:${x.userId}:${x.routeId}`)
      ? ''
      : SmsManager.queue.push(`${x.id}:${x.userId}:${x.routeId}`)));
    SmsManager.startQueue();
  },
  createBulkMessages({ list, messageFlyId, userId, senderId, routeId, campaignId, unicode,
                       flash, scheduledOn, send }) {
    return db.Message.bulkCreate(list.map(number => ({ number, messageFlyId, messageStatusId: 1,
      userId, senderId, routeId, campaignId, flash, scheduledOn, send, unicode,
    }))).then(() => db.Message.findAll({ where: { messageStatusId: 1 } }))
      .then(messages => SmsManager.addToSmsQueue(messages));
  },
  /**
   * @param statusId : created(0)
   * @returns {Promise.<Array.<Instance>>}
   */
  addToScheduler({ list, messageTextId, userId, senderId, packageTypeId, messageTypeId, scheduledOn,
                   campaignId }) {
    return db.ScheduleMessage.bulkCreate(list.map(number => ({
      userId,
      number,
      messageTextId,
      packageTypeId,
      senderId,
      messageTypeId,
      scheduledOn,
      messageStatusId: 1,
      campaignId,
    })));
  },
  canSendSms({ userId, resellerId, routeId, count }) {
    if (!userId || !routeId) {
      return Promise.reject({ message: 'Check Failed canSendSms.' });
    }
    const id = [userId];
    if (resellerId) id.push(resellerId);
    return db.User
      .findAll({
        where: { id },
        attributes: ['id', 'roleId', `sellingBalance${getRouteType(routeId)}`,
          `sendingBalance${getRouteType(routeId)}`] })
      .then(users => {
        if (users.every(u => {
          const balanceField = `${u.roleId === 4 ? 'selling' : 'sending'
          }Balance${getRouteType(routeId)}`;
          return u[balanceField] >= count;
        })) {
          return Promise.resolve();
        }
        return Promise.reject({ message: 'Limit Exceeded', code: 404 });
      });
  },
  /**
   * @param text
   * @param user
   * @param routeId
   * @param campaign
   * @param numbers
   * @param groupIds
   * @param unicode
   * @param flash
   * @param senderId
   * @param scheduledOn
   * @returns {*}
   */
  sendSms({ text, user, routeId, campaign, numbers, groupIds, unicode, flash, senderId,
            scheduledOn }) {
    if (!text || !user) return Promise.reject({ message: 'Invalid request.' });
    const { id: userId, resellerId } = user;
    return Promise.all([
      (groupIds
        ? db.GroupContact.findAll({
          where: { groupId: Number(groupIds) ? Number(groupIds) : groupIds.split(',').map(Number) },
          include: [{ attributes: ['number'], model: db.Contact }],
        }).then(data => data.map(x => x.Contact.number.substring(x.Contact.number.length - 10)))
        : Promise.resolve([])),
      (campaign
        ? db.Campaign.findOrCreate({ where: { name: campaign, userId: user.id } })
          .then(([x]) => x.id)
        : Promise.resolve()),
      SenderId.getSenderId(senderId, user.id),
    ])
      .then(([list, campaignId, senderIdObj]) => {
        const { id, senderIdStatusId } = senderIdObj.toJSON();
        if (numbers) list.push(...numbers.split(','));
        if (senderIdStatusId === 3) {
          return Promise.reject({ message: 'SenderId is blocked', code: 404 });
        }
        const send = senderIdStatusId === 2;
        return SmsManager.canSendSms({ userId, resellerId, routeId, count: list.length })
          .then(() => db.MessageFly.create({ text, numbers, groupIds, total: list.length,
            unicode, flash, scheduledOn, campaignId, routeId, senderId: id, send }))
          .then(messageFly => SmsManager.createBulkMessages({ list, messageFlyId: messageFly.id,
            userId: user.id, senderId: id, routeId, campaignId, unicode, flash, scheduledOn,
            send }));
      });
  },
};

export default SmsManager;
