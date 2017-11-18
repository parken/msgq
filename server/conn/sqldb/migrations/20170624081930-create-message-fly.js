const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('message_fly', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      text: DataTypes.STRING,
      numbers: DataTypes.STRING,
      groupIds: DataTypes.STRING,
      total: { type: DataTypes.INTEGER, defaultValue: 0 },
      success: { type: DataTypes.INTEGER, defaultValue: 0 },
      fail: { type: DataTypes.INTEGER, defaultValue: 0 },
      cutting: { type: DataTypes.INTEGER, defaultValue: 0 },
      unicode: DataTypes.BOOLEAN,
      flash: DataTypes.BOOLEAN,
      scheduledOn: DataTypes.DATE,
      send: DataTypes.BOOLEAN,
      userId: keys('users'),
      routeId: keys('routes'),
      senderId: keys('sender_ids'),
      campaignId: keys('campaigns'),
    }, timestamps(3)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('message_fly');
  },
};
