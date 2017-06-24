import db from '../../conn/sqldb';
import PackageManager from '../packageManager';

const Cutting = {
  selectNumbers(list, userId, userPackageTypeId) {
    return db.UserPackageType.find({ where: { id: userPackageTypeId } })
      .then(userPackageType => {
        if (!userPackageType) return Promise.reject({ message: 'Invalid Package Type' });
        return Promise.all([
          PackageManager.availableLimit(userId, userPackageTypeId),
          db.User.find({
            attributes: ['id',
              [`${userPackageType.name}StartFrom`, 'startFrom'],
              [`${userPackageType.name}Percent`, 'percent']],
            where: { id: userId },
          }),
          db.PriorityNumber.findAll({ attributes: ['number'], where: { number: list } }),
        ]).then(([packages, u, pL]) => {
          const user = u.toJSON();
          const priorityList = pL.map(x => x.toJSON().number);
          const totalAvailable = packages
            .reduce((total, item) => (total + item.allocated - item.used), 0);
          if (totalAvailable < list.length) return Promise.reject({ message: 'Limit Exceeded.' });
          if (list.length <= user.startFrom) return list;
          const allow = [];
          const block = [];
          list.forEach(x => (priorityList.includes(x) ? allow.push(x) : block.push(x)));
          while (allow.length < user.startFrom && allow.length !== list.length) {
            allow.push(block.shift());
          }
          if (block.length) {
            const cuttingPoint = block.length - (block.length * user.percent) / 100;
            block.splice(0, cuttingPoint).forEach(x => allow.push(x));
          }
          return { allow, block };
        });
      });
  },
};

export default Cutting;
