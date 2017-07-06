export default function (sequelize, DataTypes) {
  const MessageFly = sequelize.define('MessageFly', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: DataTypes.STRING,
    groupIds: DataTypes.STRING,
    numbers: DataTypes.STRING,
    total: DataTypes.INTEGER,
    success: DataTypes.INTEGER,
    fail: DataTypes.INTEGER,
    cutting: DataTypes.INTEGER,
    unicode: DataTypes.BOOLEAN,
    flash: DataTypes.BOOLEAN,
    scheduledOn: DataTypes.DATE,
    send: DataTypes.BOOLEAN,
  }, {
    tableName: 'message_fly',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        MessageFly.belongsTo(db.User, {
          foreignKey: 'userId',
          allowNull: false,
        });
        MessageFly.belongsTo(db.Route, {
          foreignKey: 'routeId',
          allowNull: false,
        });
        MessageFly.belongsTo(db.SenderId, {
          foreignKey: 'senderId',
        });
        MessageFly.belongsTo(db.Campaign, {
          foreignKey: 'campaignId',
        });
      },
    },
  });

  return MessageFly;
}
