

const moment = require('moment');

module.exports = function AuthCodeModel(sequelize, DataTypes) {
  const AuthCode = sequelize.define('AuthCode', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    authCode: {
      type: DataTypes.STRING(256),
      validate: {
        len: [10, 256],
      },
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: function setExpires() {
        return moment().add(30, 'seconds');
      },
    },
  }, {
    tableName: 'auth_codes',
    timestamps: true,

    classMethods: {
      associate(db) {
        AuthCode.belongsTo(db.App, {
          foreignKey: 'appId',
        });

        AuthCode.belongsTo(db.Session, {
          foreignKey: 'sessionId',
        });

        AuthCode.belongsTo(db.User, {
          foreignKey: 'userId',
        });
      },
    },
  });

  return AuthCode;
};
