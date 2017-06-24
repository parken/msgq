export default function (sequelize, DataTypes) {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    number: DataTypes.STRING,
    text: DataTypes.STRING,
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
          allowNull: false,
        });
      },
    },
  });

  return Message;
}
