import { getRouteType } from '../../conn/sqldb/helper';

export default function (sequelize, DataTypes) {
  const Sending = sequelize.define('Sending', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    limit: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'sending',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        Sending.db = db;
        Sending.belongsTo(db.User, {
          foreignKey: 'createdBy',
          allowNull: false,
          as: 'CreatedBy',
        });
        Sending.belongsTo(db.User, {
          foreignKey: 'updatedBy',
          allowNull: false,
          as: 'UpdatedBy',
        });
        Sending.belongsTo(db.User, {
          foreignKey: 'userId',
          allowNull: false,
          as: 'User',
        });
        Sending.belongsTo(db.User, {
          foreignKey: 'fromUserId',
          allowNull: false,
          as: 'FromUser',
        });
        Sending.belongsTo(db.Route, {
          foreignKey: 'routeId',
          allowNull: false,
        });
      },
    },
    hooks: {
      afterCreate(instance) {
        const db = Sending.db;
        const type = getRouteType(instance.routeId);
        const allocatedUser = db.User.build({ id: instance.userId });
        allocatedUser.increment({ [`sendingBalance${type}`]: instance.limit });
        if (instance.fromUserId) {
          const allocatingUser = db.User.build({ id: instance.fromUserId });
          allocatingUser.decrement({ [`sendingBalance${type}`]: -1 * instance.limit });
        }
      },
    },
  });

  return Sending;
}
