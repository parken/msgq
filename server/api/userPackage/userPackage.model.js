export default function (sequelize, DataTypes) {
  const UserPackage = sequelize.define('UserPackage', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    allocated: DataTypes.INTEGER,
    salesPrice: DataTypes.STRING,
    comment: DataTypes.STRING,
  }, {
    tableName: 'user_packages',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        UserPackage.belongsTo(db.User, {
          foreignKey: 'userId',
          allowNull: false,
        });
        UserPackage.belongsTo(db.UserPackageType, {
          foreignKey: 'userPackageTypeId',
          allowNull: false,
        });
      },
    },
  });

  return UserPackage;
}
