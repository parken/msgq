

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
    tableName: 'access_tokens',
    timestamps: false,
    underscored: true,
    defaultScope: {
      where: { status: 1 },
    },

    classMethods: {
      associate: function associate(db) {
        AccessToken.belongsTo(db.App, {
          foreignKey: 'appId',
        });

        AccessToken.belongsTo(db.User, {
          foreignKey: 'userId',
        });
      },
    },
  });

  return AccessToken;
};
