import logger from '../../components/logger/index';
import { getRouteType } from '../../conn/sqldb/helper';
import db from '../../conn/sqldb/index';

function handleError(res, argStatusCode, err) {
  console.log(err)
  logger.error('user.controller', err);
  const statusCode = argStatusCode || 500;
  res.status(statusCode).send(err);
}

export function createPlan(req, res) {
  const { count } = req.body;
  if (!count || req.user.roleId !== 1) return res.status(404).json({ message: 'Invalid Request' });
  return db.UpstreamPlan.create({
    upstreamId: req.params.id,
    createdBy: req.user.id,
    updatedBy: req.user.id,
    count,
  }).then(() => res.status(202).end())
    .catch(err => handleError(res, 500, err));
}
