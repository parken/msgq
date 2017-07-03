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
      total: DataTypes.INTEGER,
      success: DataTypes.INTEGER,
      fail: DataTypes.INTEGER,
      cutting: DataTypes.INTEGER,
      unicode: DataTypes.INTEGER,
      flash: DataTypes.INTEGER,
      scheduledOn: DataTypes.DATE,
      userId: keys('users'),
      routeId: keys('routes'),
      senderId: keys('sender_ids'),
    }, timestamps(3)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('message_fly');
  },
};
