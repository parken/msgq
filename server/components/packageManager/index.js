import db from '../../conn/sqldb';

const PackageManager = {
  activePackages(userId, userPackageTypeId) {
    return db.UserPackage
      .findAll({ where: { userPackageTypeId, userId }, order: [['createdAt', 'DESC']] });
  },
  packageUsage(userPackageId, userId) {
    return db.Transaction.findAll({
      attributes: ['userPackageId',
        [db.Sequelize.fn('COUNT', db.Sequelize.col('userPackageId')), 'count']],
      where: { userId, userPackageId },
      group: 'userPackageId',
    }).then(packagesUsage => {
      const result = {};
      userPackageId.forEach(id => {
        let usage = packagesUsage.filter(x => (x.userPackageId === id));
        if (usage.length) usage = usage[0].toJSON();
        else usage = { count: 0 };
        result[id] = usage.count;
      });
      return result;
    });
  },
  availableLimit(userId, userPackageTypeId) {
    return PackageManager.activePackages(userId, userPackageTypeId)
      .then(activePackages => {
        if (!activePackages.length) return Promise.reject({ message: 'No Package Available.' });
        return PackageManager.packageUsage(activePackages.map(x => x.id), userId)
          .then(packagesUsage => activePackages.map(uP => {
            const userPackage = uP.toJSON();
            userPackage.used = packagesUsage[userPackage.id];
            return userPackage;
          }));
      });
  },
};

export default PackageManager;
