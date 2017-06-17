export default function (sequelize, DataTypes) {
  const SenderId = sequelize.define('SenderId', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    blockReason: DataTypes.STRING,
    company: DataTypes.STRING,
    message: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  }, {
    tableName: 'senderId',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        SenderId.belongsTo(db.User, {
          foreignKey: 'createdBy',
          allowNull: false,
          as: 'CreatedBy',
        });
        SenderId.belongsTo(db.User, {
          foreignKey: 'updatedBy',
          allowNull: false,
          as: 'UpdatedBy',
        });
        SenderId.belongsTo(db.Upstream, {
          foreignKey: 'upstreamId',
          allowNull: false,
        });
      },
    },
  });

  return SenderId;
}
