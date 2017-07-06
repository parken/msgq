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
  const {
    groupId,
    numbers,
    text,
    campaign,
    routeId,
    unicode = false,
    flash = false,
    senderId,
    scheduledOn,
  } = req.body;

  if (!routeId || !text) {
    return res.status(400).status({ message: 'arguements missing. (route_id or message)' });
  }

  // const validate = () => {
  //   const ajv = new Ajv();
  //   let current;
  //   if(body.route_id === PROMOTIONAL) {
  //     current = schema.promotionalSMS;
  //   } else {
  //     current = schema.anySMS;
  //   }
  //
  //   ajv.addSchema(current, 'CurrentSchema');
  //   ajv.validate('CurrentSchema', req.body);
  //   return ajv.errorsText();
  // };
  //
  // const err = validate(req.body);
  //
  // if (!err) return res.status(400).json({ message: err });
  // return res.status(201).json({ id: 1 });

  const sendingTime = (scheduledOn ? new Date(scheduledOn) : new Date()).getHours();

  if (req.body.route_id === PROMOTIONAL && sendingTime >= 9 && sendingTime < 21) {
    return res.status(400).json({ message: 'Promotional SMS is allowed from 9AM to 9PM' });
  }

  return SmsManager.sendSms({ text, user: req.user, routeId, senderId, campaign, unicode,
    flash, scheduledOn, numbers, groupIds: groupId })
    .then(() => res.json({ message: 'Messages Sent.' }))
    .catch(err => {console.log(err);next(err)});
}
