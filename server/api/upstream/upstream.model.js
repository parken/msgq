export default function (sequelize, DataTypes) {
  const Upstream = sequelize.define('Upstream', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    provider: DataTypes.STRING,
    link: DataTypes.STRING,
    comment: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    support: DataTypes.STRING,
  }, {
    tableName: 'upstreams',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        Upstream.belongsTo(db.User, {
          foreignKey: 'createdBy',
          allowNull: false,
        });
        Upstream.belongsTo(db.User, {
          foreignKey: 'updatedBy',
          allowNull: false,
        });
        Upstream.belongsTo(db.SmsType, {
          foreignKey: 'smsTypeId',
          allowNull: false,
        });
      },
    },
  });

  return Upstream;
}
