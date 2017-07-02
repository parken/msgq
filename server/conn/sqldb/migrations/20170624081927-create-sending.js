const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('sending', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: keys('users'),
      createdBy: keys('users'),
      updatedBy: keys('users'),
      routeId: keys('routes'),
      limit: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    }, timestamps(3)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('sending');
  },
};
