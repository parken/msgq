'use strict';

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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    tableName: 'auth_codes',
    timestamps: false,
    underscored: true,

    classMethods: {
      associate: function associate(models) {
        //AuthCode.belongsToMany(models.Scope, {
        //  through: {
        //    model: models.ItemScope,
        //    unique: false,
        //    scope: {
        //      scopable: 'auth_code',
        //    },
        //  },
        //  foreignKey: 'scopable_id',
        //  constraints: false,
        //});

        AuthCode.belongsTo(models.App, {
          foreignKey: 'appId',
        });

        AuthCode.belongsTo(models.User, {
          foreignKey: 'userId',
        });
      },
    },
  });

  return AuthCode;
};
