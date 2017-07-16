
import debug from 'debug';
import plivo from 'plivo';
import request from 'request';
import uuidV1 from 'uuid/v1';
import db from '../../conn/sqldb';

import logger from '../logger';
import config from '../../config/environment';

const log = debug('components/notify');

/* eslint new-cap:0 */
const api = plivo.RestAPI({
  authId: config.PLIVO_AUTH_ID,
  authToken: config.PLIVO_AUTH_TOKEN,
});

api.sendMessage = (params) => {
  log('sendMessage', params);
  return new Promise((res, rej) => {
    api.send_message(params, (status, response) => {
      if (status >= 400) return rej({ status, response });
      return res({ status, response });
    });
  });
};

export function slack(text, uri) {
  const options = {
    uri: uri || config.a.URLS_SLACK,
    form: JSON.stringify({ text: text || 'Someone sending blank notification sharath...' }),
  };
  request.post(options, err => (err ? logger.error('slack', err) : 1));
}

let smsMap = {};

setInterval(() => {
  smsMap = {};
}, 5 * 60 * 1000);

export function sms({ from = '919844717202', to, text }) {
  smsMap[to] = (smsMap[to] || 0) + 1;
  if (smsMap[to] > 5) {
    slack(`rate limit: ${from}:${text}`);
    return Promise.resolve({ message: 'MSG Blocked due to rate limit' });
  }
  if (!to && !Number(to)) return Promise.reject({ message: 'to required' });
  const params = {
    src: from,
    dst: to,
    text,
    url: 'http://requestb.in/umecebum',
  };
  if (config.MSG === 'true') {
    log('plivo', params);
    return api.sendMessage(params).catch((err) => {
      logger.error('plivo', err);
      return err;
    });
  }
  log('sms', params);
  return Promise.resolve({ message: 'Enable MSG in ENV' });
}

export function notifyOnUserChannel({ userId, text: t }) {
  let text = t;
  return Promise.all([
    db.User.find({
      attributes: ['id', 'slackUrl', 'mobile', 'slackActive', 'smsActive'],
      where: { id: userId },
    }),
    db.LoginIdentifier.findOrCreate({ where: { userId }, defaults: { uuid: uuidV1() } }),
  ])
    .then(([user, [loginIdentifier]]) => {
      // eslint-disable-next-line max-len
      const url = text.match(/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gm);
      if (url) {
        const content = text.split(url);
        text = `${content[0]}${url}${url.includes('?') ? '&' : '?'}uuid=${loginIdentifier.uuid
        }${content[1]}`;
      }
      log(text);
      if (user.slackActive && user.slackUrl) slack(text, user.slackUrl);
      if (user.smsActive) sms({ to: user.mobile, text });
    });
}
