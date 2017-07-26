export default function (sequelize, DataTypes) {
  const LoginIdentifier = sequelize.define('LoginIdentifier', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: DataTypes.STRING,
  }, {
    tableName: 'login_identifier',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        LoginIdentifier.belongsTo(db.User, {
          foreignKey: 'userId',
          allowNull: false,
        });
      },
    },
  });

  return LoginIdentifier;
}
