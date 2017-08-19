const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('apps', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      userId: keys('users'),
      name: DataTypes.STRING,
      clientId: DataTypes.STRING(64),
      clientSecret: DataTypes.STRING(64),
      redirectUri: DataTypes.STRING,
    }, timestamps(3)), engine)
      .then(() => queryInterface.addColumn('users', 'appId', keys('apps')));
  },
  down(queryInterface) {
    return queryInterface.dropTable('apps');
  },
};
