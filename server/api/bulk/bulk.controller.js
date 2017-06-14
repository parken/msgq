import logger from '../../components/logger';
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

export function bulkSms(req, res) {
  if (!req.body.mobile || !req.body.message) return res.status(500).send('Invalid Request.');
  sendSms(req.body.message, req.body.mobile.split(','));
  return res.json({ message: 'success' });
}
