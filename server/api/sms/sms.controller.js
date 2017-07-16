import xl from 'excel4node';
import Ajv from 'ajv';

import db from '../../conn/sqldb';

import logger from '../../components/logger';
import { sms } from '../../components/notify';
import SenderId from '../../components/senderId';
import SmsManager from '../../components/smsManager';

import constants from '../../config/constants';

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

  const validate = () => {
    const ajv = new Ajv();
    let current;
    if (req.body.route_id === PROMOTIONAL) {
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

  const sendingTime = (scheduledOn ? new Date(scheduledOn) : new Date()).getHours();

  if (req.body.route_id === PROMOTIONAL && sendingTime >= 9 && sendingTime < 21) {
    return res.status(400).json({ message: 'Promotional SMS is allowed from 9AM to 9PM' });
  }

  return SmsManager.sendSms({ text,
    user: req.user,
    routeId,
    senderId,
    campaign,
    unicode,
    flash,
    scheduledOn,
    numbers,
    groupIds: groupId })
    .then(() => res.json({ message: 'Messages Sent.' }))
    .catch(next);
}

export function createExcel(req, res, next) {
  return db.MessageFly
    .findAll({
      include: [db.SenderId, db.Route, db.Campaign],
    })
    .then((data) => {
      const wb = new xl.Workbook();
      const ws = wb.addWorksheet('Sheet 1');
      ws.cell(1, 1).string('Text');
      ws.cell(1, 2).string('groupIds');
      ws.cell(1, 3).string('numbers');
      ws.cell(1, 4).string('total');
      ws.cell(1, 5).string('unicode');
      ws.cell(1, 6).string('flash');
      ws.cell(1, 7).string('scheduledOn');
      ws.cell(1, 8).string('routeId');
      ws.cell(1, 9).string('senderId');
      ws.cell(1, 10).string('campaignId');
      data.forEach((item, i) => {
        ws.cell(i + 2, 1).string(item.text || '');
        ws.cell(i + 2, 2).string(item.groupIds || '');
        ws.cell(i + 2, 3).string(item.numbers || '');
        ws.cell(i + 2, 4).number(item.total);
        ws.cell(i + 2, 5).bool(item.unicode);
        ws.cell(i + 2, 6).bool(item.flash);
        ws.cell(i + 2, 7).string(item.scheduledOn || '');
        ws.cell(i + 2, 8).string(item.Route.name);
        ws.cell(i + 2, 9).string(item.SenderId.name);
        ws.cell(i + 2, 10).string(item.Campaign.name);
      });
      wb.write('Excel.xlsx', res);
    })
    .catch(next);
}
