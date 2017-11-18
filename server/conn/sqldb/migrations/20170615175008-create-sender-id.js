const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('sender_ids', Object.assign({
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
      senderIdStatusId: keys('sender_id_status'),
      createdBy: keys('users'),
      updatedBy: keys('users'),
      upstreamId: keys('upstreams'),
    }, timestamps(3)), engine);
  },

  down(queryInterface) {
    return queryInterface.dropTable('sender_ids');
  },
};
