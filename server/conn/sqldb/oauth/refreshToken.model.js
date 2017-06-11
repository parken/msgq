

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
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    tableName: 'refresh_tokens',
    timestamps: false,
    underscored: true,
    createdAt: true,

    classMethods: {
      associate: function associate(models) {
        RefreshToken.belongsTo(models.App, {
          foreignKey: 'appId',
        });

        RefreshToken.belongsTo(models.User, {
          foreignKey: 'userId',
        });
      },
    },
  });

  return RefreshToken;
};
