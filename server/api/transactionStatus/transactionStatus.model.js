export default function (sequelize, DataTypes) {
  const TransactionStatus = sequelize.define('TransactionStatus', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'transactionStatus',
    timestamps: true,
    paranoid: true,
  });

  return TransactionStatus;
}
