const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('upstream_plans', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      count: DataTypes.INTEGER,
      upstreamId: keys('upstreams'),
      createdBy: keys('users'),
      updatedBy: keys('users'),
    }, timestamps(3)), engine);
  },

  down(queryInterface) {
    return queryInterface.dropTable('upstream_plans');
  },
};
