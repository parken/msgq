export default function (sequelize, DataTypes) {
  const MessageStatus = sequelize.define('MessageStatus', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'message_status',
    timestamps: true,
    paranoid: true,
  });

  return MessageStatus;
}
