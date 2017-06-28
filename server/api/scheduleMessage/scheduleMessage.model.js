export default function (sequelize, DataTypes) {
  const ScheduleMessage = sequelize.define('ScheduleMessage', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    number: DataTypes.STRING,
    text: DataTypes.STRING,
    comment: DataTypes.STRING,
    statusId: DataTypes.INTEGER,
    scheduledOn: DataTypes.DATE,
    messageTypeId: DataTypes.INTEGER,
  }, {
    tableName: 'schedule_messages',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        ScheduleMessage.belongsTo(db.User, {
          foreignKey: 'userId',
          allowNull: false,
        });
        ScheduleMessage.belongsTo(db.MessageStatus, {
          foreignKey: 'messageStatusId',
          defaultValue: 0,
          allowNull: false,
        });
        ScheduleMessage.belongsTo(db.SenderId, {
          foreignKey: 'senderId',
        });
        ScheduleMessage.belongsTo(db.PackageType, {
          foreignKey: 'packageTypeId',
        });
        ScheduleMessage.belongsTo(db.Campaign, {
          foreignKey: 'campaignId',
        });
        ScheduleMessage.belongsTo(db.MessageText, {
          foreignKey: 'messageTextId',
        });
      },
    },
  });

  return ScheduleMessage;
}
