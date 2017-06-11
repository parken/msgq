'use strict';

module.exports = function AppModel(sequelize, DataTypes) {
  const App = sequelize.define('App', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      validate: {
        len: [5, 255],
      },
      allowNull: false,
    },
    clientId: {
      type: DataTypes.STRING(64),
      unique: true,
      validate: {
        len: [8, 64],
      },
      allowNull: false,
    },
    clientSecret: {
      type: DataTypes.STRING(64),
      validate: {
        len: [8, 64],
      },
      allowNull: false,
    },
    redirectUri: {
      type: DataTypes.STRING(255),
      validate: {
        len: [5, 255],
      },
      allowNull: false,
    },
  }, {
    tableName: 'apps',
    timestamps: false,
    underscored: true,

    classMethods: {
      associate: function associate(models) {
        //App.belongsToMany(models.Scope, {
        //  through: {
        //    model: models.ItemScope,
        //    unique: false,
        //    scope: {
        //      taggable: 'app',
        //    },
        //  },
        //  foreignKey: 'scopable_id',
        //  constraints: false,
        //});

        App.hasMany(models.AccessToken);
        App.hasMany(models.RefreshToken);

        App.belongsTo(models.User, {
          foreignKey: 'userId',
        });
      },
    },
  });

  return App;
};
