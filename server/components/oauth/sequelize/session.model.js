

module.exports = function SessionModel(sequelize, DataTypes) {
  const Session = sequelize.define('Session', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    device: DataTypes.STRING,
    os: DataTypes.STRING,
    browser: DataTypes.STRING,
    country: DataTypes.STRING,
    region: DataTypes.STRING,
    city: DataTypes.STRING,
    ip: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    metro: DataTypes.STRING,
    zip: DataTypes.STRING,
  }, {
    tableName: 'sessions',
    timestamps: true,

    classMethods: {
      associate(db) {
        Session.hasMany(db.AccessToken, {
          foreignKey: 'sessionId',
        });

        Session.hasMany(db.AuthCode, {
          foreignKey: 'sessionId',
        });

        Session.hasMany(db.RefreshToken, {
          foreignKey: 'sessionId',
        });

        Session.belongsTo(db.User, {
          foreignKey: 'userId',
        });
      },
    },
  });

  return Session;
};
