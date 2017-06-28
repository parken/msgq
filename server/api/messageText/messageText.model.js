export default function (sequelize, DataTypes) {
  const MessageText = sequelize.define('MessageText', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: DataTypes.STRING,
  }, {
    tableName: 'message_texts',
    timestamps: true,
    paranoid: true,
  });

  return MessageText;
}
