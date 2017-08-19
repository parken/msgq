import db from '../../conn/sqldb';

export function index(req, res, next) {
  const { limit = 20, offset = 0, fl, where } = req.query;

  const options = {
    attributes: fl ? fl.split(',') : ['id', 'name'],
    limit: Number(limit),
    offset: Number(offset),
    where: { userId: req.user.id },
  };

  if (where) {
    options.where = where.split(',').reduce((nxt, x) => {
      const [key, value] = x.split(':');
      return Object.assign(nxt, { [key]: value });
    }, options.where);
  }

  return Promise
    .all([
      db.Campaign.findAll(options),
      db.Campaign.count(),
    ])
    .then(([routes, numFound]) => res.json({ items: routes, meta: { numFound } }))
    .catch(next);
}

export function show(req, res, next) {
  return db.Campaign
    .find({
      attributes: ['id', 'name'],
      where: {
        $or: [{ id: req.params.id }, { name: req.params.id }],
        userId: req.user.id,
      },
    })
    .then(campaign => db.MessageFly
      .find({
        where: { campaignId: campaign.id },
        order: [['createdAt', 'DESC']],
        include: [db.SenderId],
      }).then(messageFly => Promise.resolve([campaign, messageFly])))
    .then(([campaign, { SenderId: { name: senderId }, routeId, groupIds, numbers }]) =>
      res.json(Object.assign(campaign.toJSON(), { groupIds, numbers, senderId, routeId })))
    .catch(next);
}

export function create(req, res, next) {
  return db.Campaign
    .create(Object.assign({}, req.body, {
      createdBy: req.user.id,
      updatedBy: req.user.id,
    }))
    .then(({ id }) => res.status(201).json({ id }))
    .catch(next);
}

export function update(req, res, next) {
  return db.Campaign
    .update(
      Object.assign({}, req.body, {
        active: false,
        updatedBy: req.user.id,
      }),
      { where: { id: req.params.id } })
    .then(() => res.status(201).end())
    .catch(next);
}

export function destroy(req, res, next) {
  return db.Campaign
    .destroy({ where: { id: req.params.id } })
    .then(() => res.status(201).end())
    .catch(next);
}

