

const moment = require('moment');

module.exports = function RefreshTokenModel(sequelize, DataTypes) {
  const RefreshToken = sequelize.define('RefreshToken', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    refreshToken: {
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
        return moment().add(1, 'months');
      },
    },
  }, {
    tableName: 'refresh_tokens',
    timestamps: true,

    classMethods: {
      associate(db) {
        RefreshToken.belongsTo(db.App, {
          foreignKey: 'appId',
        });

        RefreshToken.belongsTo(db.Session, {
          foreignKey: 'sessionId',
        });

        RefreshToken.belongsTo(db.User, {
          foreignKey: 'userId',
        });
      },
    },
  });

  return RefreshToken;
};
