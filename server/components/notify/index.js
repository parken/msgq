
import debug from 'debug';
import plivo from 'plivo';
import request from 'request';

import logger from '../logger';
import config from '../../config/environment';

const log = debug('components/notify');

/* eslint new-cap:0 */
const api = plivo.RestAPI({
  authId: config.PLIVO.AUTH_ID,
  authToken: config.PLIVO.AUTH_TOKEN,
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

export function slack(text) {
  const options = {
    uri: config.a.URLS_SLACK,
    form: JSON.stringify({ text: text || 'Someone sending blank notification sharath...' }),
  };
  request.post(options, (err) => (err ? logger.error('slack', err) : 1));
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
    return api.sendMessage(params).catch(err => {
      logger.error('plivo', err);
      return err;
    });
  }
  log('sms', params);
  return Promise.resolve({ message: 'Enable MSG in ENV' });
}
