export default function (sequelize, DataTypes) {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    number: DataTypes.STRING,
  }, {
    tableName: 'messages',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
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
        Message.belongsTo(db.PackageType, {
          foreignKey: 'packageTypeId',
        });
        Message.belongsTo(db.Campaign, {
          foreignKey: 'campaignId',
        });
        Message.belongsTo(db.MessageText, {
          foreignKey: 'messageTextId',
        });
      },
    },
  });

  return Message;
}
