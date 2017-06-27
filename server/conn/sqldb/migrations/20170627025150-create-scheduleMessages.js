const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('schedule_messages', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      number: DataTypes.STRING,
      text: DataTypes.STRING,
      scheduledOn: DataTypes.DATE,
      messageTypeId: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      messageStatusId: keys('message_status'),
      senderId: keys('senderId'),
      packageTypeId: keys('package_type'),
      userId: keys('users'),
      campaignId: keys('campaigns'),
    }, timestamps(3)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('schedule_messages');
  },
};
