export default function (sequelize, DataTypes) {
  const UserPackageType = sequelize.define('UserPackageType', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'user_package_type',
    timestamps: true,
    paranoid: true,
  });

  return UserPackageType;
}
