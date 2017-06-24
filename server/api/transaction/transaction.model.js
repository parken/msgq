export default function (sequelize, DataTypes) {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'transactions',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        Transaction.belongsTo(db.User, {
          foreignKey: 'userId',
          allowNull: false,
        });
        Transaction.belongsTo(db.UserPackage, {
          foreignKey: 'userPackageId',
          allowNull: false,
        });
        Transaction.belongsTo(db.Message, {
          foreignKey: 'messageId',
          allowNull: false,
        });
      },
    },
  });

  return Transaction;
}
