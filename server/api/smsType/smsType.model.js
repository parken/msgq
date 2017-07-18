export default function (sequelize, DataTypes) {
  const SmsType = sequelize.define('SmsType', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  }, {
    tableName: 'smsTypes',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate() {},
    },
  });

  return SmsType;
}
