
export default function (sequelize, DataTypes) {
  const DomainType = sequelize.define('DomainType', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'domain_types',
    timestamps: true,
    paranoid: true,
  });

  return DomainType;
}
