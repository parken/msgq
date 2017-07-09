import { getRouteType } from '../../conn/sqldb/helper';

export default function (sequelize, DataTypes) {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    number: DataTypes.STRING,
    unicode: DataTypes.INTEGER,
    flash: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    scheduledOn: DataTypes.DATE,
    operatorOn: DataTypes.DATE,
    deliveredOn: DataTypes.DATE,
    send: { type: DataTypes.BOOLEAN, defaultValue: true },
  }, {
    tableName: 'messages',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        Message.db = db;
        Message.belongsTo(db.User, {
          foreignKey: 'userId',
          allowNull: false,
        });
        Message.belongsTo(db.MessageStatus, {
          foreignKey: 'messageStatusId',
          defaultValue: 0,
          allowNull: false,
        });
        Message.belongsTo(db.SenderId, {
          foreignKey: 'senderId',
        });
        Message.belongsTo(db.Campaign, {
          foreignKey: 'campaignId',
        });
        Message.belongsTo(db.MessageFly, {
          foreignKey: 'messageFlyId',
        });
        Message.belongsTo(db.Route, {
          foreignKey: 'routeId',
        });
      },
    },
    hooks: {
      afterBulkCreate(instances) {
        const { userId, routeId } = instances[0] || {};
        if (!userId || !routeId) return;
        Message.db.User.find({
          attributes: ['resellerId'],
          where: { id: userId },
        }).then(({ resellerId }) => Message.db.User.findAll({
          attributes: ['id', 'roleId', `sellingBalance${getRouteType(routeId)}`,
            `sendingBalance${getRouteType(routeId)}`],
          where: { id: [userId, resellerId] },
        })).then(users => {
          const currentUser = users.filter(x => (x.id === userId))[0];
          const resellerUser = users.filter(x => (x.id !== userId))[0];
          currentUser.decrement({ [`${currentUser.roleId === 4 ? 'selling' : 'sending'
          }Balance${getRouteType(routeId)}`]: instances.length });
          if (resellerUser) {
            resellerUser.decrement({ [`${resellerUser.roleId === 4 ? 'selling' : 'sending'
              }Balance${getRouteType(routeId)}`]: instances.length });
          }
        })
          .catch(err => console.log(err));
      },
    },
  });

  return Message;
}
