const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('upstreams', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      provider: DataTypes.STRING,
      link: DataTypes.STRING,
      support: DataTypes.STRING,
      comment: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      routeId: DataTypes.STRING,
      default: DataTypes.STRING,
      parameter: DataTypes.STRING,
      routeMap: DataTypes.STRING,
      method: DataTypes.STRING,
      balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdBy: keys('users'),
      updatedBy: keys('users'),
    }, timestamps(3)), engine);
  },

  down(queryInterface) {
    return queryInterface.dropTable('upstreams');
  },
};
