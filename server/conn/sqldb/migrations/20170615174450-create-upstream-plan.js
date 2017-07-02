const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('upstreamPlans', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      availableCount: DataTypes.INTEGER,
      initialCount: DataTypes.INTEGER,
      upstreamId: keys('upstreams'),
    }, timestamps(3)), engine);
  },

  down(queryInterface) {
    return queryInterface.dropTable('upstreamPlans');
  },
};
