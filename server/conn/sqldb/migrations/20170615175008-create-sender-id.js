const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('senderId', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      blockReason: DataTypes.STRING,
      company: DataTypes.STRING,
      message: DataTypes.STRING,
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      createdBy: keys('users'),
      updatedBy: keys('users'),
      upstreamId: keys('upstreams'),
    }, timestamps(3)), engine);
  },

  down(queryInterface) {
    return queryInterface.dropTable('senderId');
  },
};
