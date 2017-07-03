const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('messages', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      number: DataTypes.STRING,
      unicode: DataTypes.INTEGER,
      flash: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      scheduledOn: DataTypes.DATE,
      operatorOn: DataTypes.DATE,
      deliveredOn: DataTypes.DATE,
      userId: keys('users'),
      messageStatusId: keys('message_status'),
      senderId: keys('sender_ids'),
      campaignId: keys('campaigns'),
      routeId: keys('routes'),
      messageFlyId: keys('message_fly'),
    }, timestamps(3)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('messages');
  },
};
