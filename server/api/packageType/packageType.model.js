export default function (sequelize, DataTypes) {
  const PackageType = sequelize.define('PackageType', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'package_type',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        PackageType.hasMany(db.UserPackage);
      },
    },
  });

  return PackageType;
}
