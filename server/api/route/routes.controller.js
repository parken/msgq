import logger from '../../components/logger/index';
import PackageManager from '../../components/packageManager/index';
import config from '../../config/environment/index';
import { notifyOnUserChannel } from '../../components/notify/index';
import db from '../../conn/sqldb/index';

function handleError(res, argStatusCode, err) {
  console.log(err)
  logger.error('user.controller', err);
  const statusCode = argStatusCode || 500;
  res.status(statusCode).send(err);
}

export function index(req, res) {
  return Promise.all([
    db.UserPackage.findAll({
      attributes: [
        [db.sequelize.fn('DISTINCT', db.sequelize.col('packageTypeId')), 'id'],
      ],
      where: { userId: req.user.id },
    }),
    db.PackageType.findAll(),
  ]).then(([userPackageTypes, packageTypes]) => Promise.all(
    userPackageTypes.map(x => PackageManager.availableLimit(req.user.id, x.toJSON().id)))
    .then(data => res.json({
      routes: userPackageTypes.map((x, i) => {
        const userPackage = x.toJSON();
        const allocated = data[i].reduce((total, item) => (total + item.allocated), 0);
        const used = data[i].reduce((total, item) => (total + item.used), 0);
        userPackage.balance = allocated - used;
        userPackage.name = packageTypes.filter(y => (y.id === x.id))[0].name;
        return userPackage;
      }),
      senderId: 'MANJSE',
    }))
  ).catch(err => handleError(res, 500, err));
}
