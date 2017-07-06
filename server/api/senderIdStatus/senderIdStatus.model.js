export default function (sequelize, DataTypes) {
  const SenderIdStatus = sequelize.define('senderIdStatus', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'senderIdStatus',
    timestamps: true,
    paranoid: true,
  });

  return SenderIdStatus;
}
