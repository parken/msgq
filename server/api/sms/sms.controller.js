import Ajv from 'ajv';

import db from '../../conn/sqldb';

import logger from '../../components/logger';
import { sms } from '../../components/notify';
import SenderId from '../../components/senderId';
import SmsManager from '../../components/smsManager';

import constants from '../../config/constants'

import * as schema from './sms.schema';

const { sms_types, routes } = constants;
const { PLAIN, UNICODE } = sms_types;
const { PROMOTIONAL, TRASACTIONAL, SENDER_ID, OTP } = routes;

function sendSms(text, list) {
  const to = list.shift();
  if (to) {
    return sms({ to, text })
      .then(() => sendSms(text, list))
      .catch(() => sendSms(text, list));
  }
  return Promise.resolve();
}

export function show(req, res) {
  return res.json({ id: 1 });
}

export function create(req, res, next) {
  const { body } = req;
  if (!body.route_id || !body.message) {
    return res.status(400).status({ message: 'arguements missing. (route_id or message)' });
  }

  const validate = () => {
    const ajv = new Ajv();
    let current;
    if(body.route_id === PROMOTIONAL) {
      current = schema.promotionalSMS;
    } else {
      current = schema.anySMS;
    }

    ajv.addSchema(current, 'CurrentSchema');
    ajv.validate('CurrentSchema', req.body);
    return ajv.errorsText();
  };

  const err = validate(req.body);

  if (!err) return res.status(400).json({ message: err });
  return res.status(201).json({ id: 1 });

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

  const sendingTime = (schedueledOn ? new Date(schedueledOn) : new Date()).getHours();

  if (req.body.route_id === PROMOTIONAL &&  sendingTime >= 9 && sendingTime < 21) {
    return res.status(400).json({ message: 'Promotional SMS is allowed from 9AM to 9PM' });
  }

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
    .catch(next);
  // sendSms(req.body.message, req.body.mobile.split(','));
}
