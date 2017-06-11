'use strict';

const moment = require('moment');

module.exports = function AccessTokenModel(sequelize, DataTypes) {
  const AccessToken = sequelize.define('AccessToken', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    accessToken: {
      type: DataTypes.STRING(256),
      validate: {
        len: {
          args: [10, 256],
          msg: 'Maximum length for value field is 255',
        },
      },
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: function setExpires() {
        return moment().add(1, 'hours');
      },
    },
  }, {
    tableName: 'access_tokens',
    timestamps: true,

    classMethods: {
      associate(db) {
        AccessToken.belongsTo(db.App, {
          foreignKey: 'appId',
        });

        AccessToken.belongsTo(db.Session, {
          foreignKey: 'sessionId',
        });

        AccessToken.belongsTo(db.User, {
          foreignKey: 'userId',
        });
      },
    },
  });

  return AccessToken;
};
