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
      userId: keys('users'),
      messageStatusId: keys('message_status'),
      senderId: keys('senderId'),
      campaignId: keys('campaigns'),
      packageTypeId: keys('package_type'),
      messageTextId: keys('message_texts'),
    }, timestamps(3)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('messages');
  },
};
