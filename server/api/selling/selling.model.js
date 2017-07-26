import { getRouteType } from '../../conn/sqldb/helper';

export default function (sequelize, DataTypes) {
  const Selling = sequelize.define('Selling', {
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
    tableName: 'selling',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        Selling.db = db;
        Selling.belongsTo(db.User, {
          foreignKey: 'createdBy',
          allowNull: false,
          as: 'CreatedBy',
        });
        Selling.belongsTo(db.User, {
          foreignKey: 'updatedBy',
          allowNull: false,
          as: 'UpdatedBy',
        });
        Selling.belongsTo(db.User, {
          foreignKey: 'sendingUserId',
          allowNull: false,
          as: 'SendingUser',
        });
        Selling.belongsTo(db.User, {
          foreignKey: 'fromUserId',
          allowNull: false,
          as: 'FromUser',
        });
        Selling.belongsTo(db.User, {
          foreignKey: 'userId',
          allowNull: false,
          as: 'User',
        });
        Selling.belongsTo(db.Route, {
          foreignKey: 'routeId',
          allowNull: false,
        });
      },
    },
    hooks: {
      afterCreate(instance) {
        const db = Selling.db;
        const type = getRouteType(instance.routeId);
        const allocatedUser = db.User.build({ id: instance.userId });
        allocatedUser.increment({ [`sellingBalance${type}`]: instance.limit });
        if (instance.fromUserId) {
          const allocatingUser = db.User.build({ id: instance.fromUserId });
          allocatingUser.decrement({ [`sellingBalance${type}`]: instance.limit });
        }
      },
    },
  });

  return Selling;
}
