import debug from 'debug';
import moment from 'moment';
import rp from 'request-promise';

import db from '../../conn/sqldb';
import SenderId from '../../components/senderId';
import logger from '../../components/logger';
import { getRouteType } from '../../conn/sqldb/helper';

const log = debug('components/smsManager');

const SmsManager = {
  messageFly: { queue: [], processing: false },
  processItem({ list, reject = false }) {
    if (!list.length) return Promise.resolve();
    const {
      upstreamId,
      routeId,
      SenderId: { id: senderId, name: SenderIdName },
      MessageFly: { id: messageFlyId, text },
    } = list[0];
    return db.Upstream
      .find({ where: { id: upstreamId } })
      .then(upstream => {
        const messages = [];
        const newList = [];
        list.forEach(x => {
          if (x.upstreamId === upstreamId && x.routeId === routeId && x.senderId === senderId
            && x.messageFlyId === messageFlyId) {
            return messages.push(x);
          }
          return newList.push(x);
        });
        const data = JSON.parse(upstream.default);
        const routeMap = JSON.parse(upstream.routeMap);
        upstream.parameter.split(',').forEach(key => {
          switch (key) {
            case 'smsc': {
              data[key] = routeMap[routeId];
              break;
            }
            case 'to': {
              data[key] = messages.map(x => x.number).join(upstream.joinKey);
              break;
            }
            case 'from': {
              data[key] = SenderIdName;
              break;
            }
            case 'text': {
              data[key] = text;
              break;
            }
            case 'dlr-url': {
              data[key] = `http://dlr.msgque.com/routesms/?dlr=%d&answer=%A&to=%p&ts=%T&smsID=${messageFlyId}`;
              break;
            }
            default:
          }
        });
        return rp({
          method: 'GET',
          uri: upstream.link,
          qs: data,
          json: true,
        }).then(body => db.Message
          .update({ messageStatusId: 4, comment: body, operatorOn: moment() }, {
            where: { id: messages.map(x => x.id) },
          }))
          .then(() => SmsManager.processItem({ list: newList, reject }))
          .catch(() => SmsManager.processItem({ list: newList, reject: true }));
      });
  },
  processOperatorSelection({ list }) {
    if (!list.length) return Promise.resolve();
    const { routeId, messageFlyId } = list[0];
    return db.Upstream
      .findAll({ where: {
        routeId: db.Sequelize.literal(`find_in_set('${routeId}',routeId) <> 0`),
        balance: { $gt: 0 },
      } })
      .then((upstreams) => {
        const upstreamMessageMap = {};
        for (let i = 0; i < upstreams.length; i += 1) {
          const upstream = upstreams[i];
          if (upstream.balance >= list.length) {
            upstreamMessageMap[upstream.id] = list.splice(0, list.length);
            break;
          }
          upstreamMessageMap[upstream.id] = list.splice(0, upstream.balance);
        }
        upstreamMessageMap[0] = list;
        return db.sequelize.transaction()
          .then((transaction) => {
            const promises = [
              upstreamMessageMap[0].length
                ? db.Message.update(
                  { messageStatusId: 3 },
                  { where: { id: upstreamMessageMap[0].map(x => x.id) } },
                  { transaction })
                : Promise.resolve(),
            ];
            delete upstreamMessageMap[0];
            const messageIdAllocated = [];
            promises.push(...Object.keys(upstreamMessageMap).map((upstreamId) => {
              const id = upstreamMessageMap[upstreamId].map(x => x.id);
              messageIdAllocated.push(...id);
              const upstream = db.Upstream.build({ id: upstreamId });
              return db.Message.update(
                { messageStatusId: 2, upstreamId },
                { where: { id } }, { transaction })
                .then(() => upstream.decrement({ balance: id.length }, { transaction }))
                .then(() => db.Transaction.create(
                  {
                    upstreamId,
                    messageFlyId,
                    count: upstreamMessageMap[upstreamId].map(x => x.id).length,
                    transactionStatusId: 1,
                  }, { transaction }));
            }));
            return Promise
              .all(promises)
              .then((data) => {
                transaction.commit();
                return db.Message.findAll({
                  where: { id: messageIdAllocated },
                  include: [db.Upstream, db.MessageFly, db.SenderId],
                }).then(messages => SmsManager.processItem({ list: messages }))
                  .then(() => Promise.resolve(data.splice(1, data.length)));
              })
              .then(transactions => db.Transaction.update(
                { transactionStatusId: 2 },
                { where: { id: transactions.map(x => x.id) } }))
              .catch((err) => {
                transaction.rollback();
                return Promise.reject(err);
              });
          });
      });
  },
  processUserMessages() {
    if (SmsManager.messageFly.processing) return Promise.resolve();
    const [messageFlyId, userId, routeId] = (SmsManager.messageFly.queue.shift() || '').split(':');
    if (messageFlyId) {
      SmsManager.messageFly.processing = true;
      return db.Message
        .findAll({
          where: { userId, routeId, messageFlyId },
        })
        .then(list => SmsManager.processOperatorSelection({ list }))
        .then(() => {
          SmsManager.messageFly.processing = false;
          SmsManager.processUserMessages();
        })
        .catch(() => {
          SmsManager.messageFly.processing = false;
          return SmsManager.processUserMessages();
        });
    }
    return Promise.resolve();
  },
  startQueue() {
    if (!SmsManager.messageFly.processing) SmsManager.processUserMessages();
    return Promise.resolve();
  },
  addToSmsQueue(messages) {
    messages.forEach(x => (SmsManager.messageFly.queue
      .includes(`${x.messageFlyId}:${x.userId}:${x.routeId}`)
      ? ''
      : SmsManager.messageFly.queue.push(`${x.messageFlyId}:${x.userId}:${x.routeId}`)));
    return SmsManager.startQueue();
  },
  addPendingMessagesToQueue() {
    return Promise.all([
      db.Message.findAll({
        attributes: ['messageFlyId', 'routeId', 'userId'],
        where: {
          messageStatusId: [1],
          send: 1,
          createdAt: { $lte: moment().subtract(10, 'minute') },
        },
      }).then(messages => SmsManager.addToSmsQueue(messages)),
      db.Transaction.findAll({
        where: { transactionStatusId: 1, createdAt: { $lte: moment().subtract(10, 'minute') } },
      }).then((transactions) => {
        if (!transactions.length) return Promise.resolve();
        return db.Message.findAll({
          where: {
            messageStatusId: 2,
            messageFlyId: transactions.map(x => x.messageFlyId),
            send: 1,
            createdAt: { $lte: moment().subtract(10, 'minute') },
          },
          include: [db.Upstream, db.MessageFly, db.SenderId],
        }).then(messages => SmsManager.processItem({ list: messages }))
          .then(() => db.Transaction.update(
            { transactionStatusId: 2 },
            { where: { id: transactions.map(x => x.id) } }));
      }),
    ]).catch(err => logger.error('addPendingMessagesToQueue', err));
  },
  createBulkMessages({ list, messageFlyId, userId, senderId, routeId, campaignId, unicode,
    flash, scheduledOn, send }) {
    return db.Message.bulkCreate(list.map(number => ({ number,
      messageFlyId,
      messageStatusId: 1,
      userId,
      senderId,
      routeId,
      campaignId,
      flash,
      scheduledOn,
      send,
      unicode,
    }))).then(messages => (send ? SmsManager.addToSmsQueue(messages) : Promise.resolve()));
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
      .then((users) => {
        if (users.every((u) => {
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
          .then(() => db.MessageFly.create({ text,
            numbers,
            groupIds,
            total: list.length,
            unicode,
            flash,
            userId,
            scheduledOn,
            campaignId,
            routeId,
            senderId: id,
            send }))
          .then(messageFly => SmsManager
            .createBulkMessages({ list,
              messageFlyId: messageFly.id,
              userId: user.id,
              senderId: id,
              routeId,
              campaignId,
              unicode,
              flash,
              scheduledOn,
              send,
            }));
      });
  },
};

export default SmsManager;
