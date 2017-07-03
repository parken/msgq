export default function (sequelize, DataTypes) {
  const MessageFly = sequelize.define('MessageFly', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: DataTypes.STRING,
    numbers: DataTypes.STRING,
    groupIds: DataTypes.STRING,
    total: DataTypes.INTEGER,
    success: DataTypes.INTEGER,
    fail: DataTypes.INTEGER,
    cutting: DataTypes.INTEGER,
    unicode: DataTypes.INTEGER,
    flash: DataTypes.INTEGER,
    scheduledOn: DataTypes.DATE,
  }, {
    tableName: 'messageFly',
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
      },
    },
  });

  return MessageFly;
}
