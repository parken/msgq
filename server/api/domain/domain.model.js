
export default function (sequelize, DataTypes) {
  const Domain = sequelize.define('Domain', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    classkey: DataTypes.STRING,
    price: DataTypes.STRING,
    existing: DataTypes.BOOLEAN,
    expiresAt: { type: DataTypes.DATE },
  }, {
    tableName: 'domains',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        Domain.belongsTo(db.User, {
          foreignKey: 'userId',
          allowNull: false,
        });
        Domain.belongsTo(db.DomainType, {
          foreignKey: 'domainTypeId',
          allowNull: true,
        });
      },
    },
  });

  return Domain;
}
