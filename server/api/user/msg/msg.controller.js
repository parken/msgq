import { Msg, User } from '../../../conn/sqldb';
import logger from '../../../components/logger';

function handleError(res, argStatusCode, err) {
  logger.error('msg.controller', err);
  console.log('msg.controller', err);
  const statusCode = argStatusCode || 500;
  res.status(statusCode).send(err);
}

export function index(req, res) {
  return Msg
    .findAll({
      where: {
        userId: req.params.id,
      },
    })
    .then(data => res.json(data))
    .catch(err => handleError(res, 500, err));
}

export function show(req, res) {
  return Msg
    .find({ where: { id: req.params.id } })
    .then(data => res.json(data))
    .catch(err => handleError(res, 500, err));
}


export function create(req, res) {
  const msg = req.body;
  msg.userId = req.user.id;
  return Msg
    .create(msg)
    .then(data => res.json(data))
    .catch(err => handleError(res, 500, err));
}

export function update(req, res) {
  const msg = req.body;
  delete msg.id;
  return Msg
    .update(msg, {
      where: {
        id: req.params.id,
      },
    })
    .then(() => res.json({
      id: req.params.id,
    }))
    .catch(err => handleError(res, 500, err));
}
