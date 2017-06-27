import db from '../../conn/sqldb';
import SenderId from '../../components/senderId';
import logger from '../../components/logger';
import SmsManager from '../../components/smsManager';
import { sms } from '../../components/notify';

function handleError(res, argStatusCode, err) {
  logger.error('user.controller', err);
  const statusCode = argStatusCode || 500;
  res.status(statusCode).send(err);
}

function sendSms(text, list) {
  const to = list.shift();
  if (to) {
    return sms({ to, text })
      .then(() => sendSms(text, list))
      .catch(() => sendSms(text, list));
  }
  return Promise.resolve();
}

/**
 * req.body.route
 * sender_id_
 * mobile numbers(including csv file, group_id, mobilenumbers) (placeholder: Enter mobile numbers here
 1234567890, 0123456789, 9012345678
 8901234567
 7890123456)
 * unicode: false
 * flash: false
 * text: (placeholder: You are delivering crucial information. Keep it to-the-point.)
 * campaingn_id || campaign_name
 * sign: true
 * duplicate:true if lastmessage == current message
 * scheduled_on:  if route === promotional and 9 < currenttime > 9 throw error
 *
 */
export function bulkSms(req, res) {
  const {
    groupId,
    numbers,
    text,
    campaign,
    smsTypeId,
    senderId,
    packageTypeId,
    scheduledOn,
  } = req.body;
  return Promise.all([
    (groupId
      ? db.GroupContact.findAll({
        where: { groupId: groupId.split(',').map(Number) },
        include: [{ attributes: ['number'], model: db.Contact }],
      }).then(data => data.map(x => x.Contact.number.substring(x.Contact.number.length - 10)))
      : Promise.resolve([])),
    (campaign
      ? db.Campaign.findOrCreate({ where: { name: campaign, userId: req.user.id } })
        .then(([x]) => x.id)
      : Promise.resolve()),
    SenderId.getSenderId(senderId, req.user.id),
  ])
    .then(([list, campaignId, senderIdObj]) => {
      if (numbers) list.push(...numbers.split(','));
      if (senderIdObj.status === 3) return res.status(404).json({ message: 'SenderId is blocked' });
      SmsManager.sendSms({
        list,
        text,
        userId: req.user.id,
        packageTypeId,
        senderId: senderIdObj.toJSON(),
        campaignId,
        smsTypeId,
        scheduledOn,
      });
      return res.json({ message: 'success' });
    })
    .catch(err => handleError(res, 500, err));
  // sendSms(req.body.message, req.body.mobile.split(','));
}
