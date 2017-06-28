import db from '../../conn/sqldb';

const SmsManager = {
  queue: [],
  processing: false,
  processItem() {
    const [messageId, userId, packageTypeId] = (SmsManager.queue.shift() || '').split(':');
    if (messageId) {
      SmsManager.processing = true;
      console.log(messageId, userId, packageTypeId);
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
    messages.forEach(x => (SmsManager.queue.includes(`${x.id}:${x.userId}:${x.packageTypeId}`)
      ? ''
      : SmsManager.queue.push(`${x.id}:${x.userId}:${x.packageTypeId}`)));
    SmsManager.startQueue();
  },
  createBulkMessages({ list, messageTextId, userId, senderId, packageTypeId, campaignId }) {
    return db.Message.bulkCreate(list.map(number => ({
      number,
      messageTextId,
      messageStatusId: 1,
      userId,
      senderId,
      packageTypeId,
      campaignId,
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
  /**
   * @param list :list of number
   * @param text :content of message
   * @param userId :message send from user id
   * @param packageTypeId : transactional(1), promotional(2), senderId(3), OTP(4)
   * @param messageTypeId : sendNow(1), sendLater(2)
   * @param id : senderId id
   * @param status: senderId status
   * @param scheduledOn : send sms at this time
   * @returns {*}
   */
  sendSms({ list, text, userId, packageTypeId = 1, messageTypeId = 1, campaignId,
            senderId: { id, status = 0 } = {}, scheduledOn } = {}) {
    if (!list || !text || !userId) return Promise.reject({ message: 'Invalid request.' });
    if (status === 3) return Promise.reject({ message: 'SenderId is blocked' });
    return db.MessageText.create({ text })
      .then(messageText => {
        if (status === 2 && messageTypeId === 1) {
          return SmsManager
            .createBulkMessages({ list, messageTextId: messageText.id, userId,
              senderId: id, packageTypeId, campaignId });
        }
        return SmsManager.addToScheduler({ list, messageTextId: messageText.id,
          userId, senderId: id, packageTypeId, messageTypeId, scheduledOn, campaignId });
      });
  },
};

export default SmsManager;
