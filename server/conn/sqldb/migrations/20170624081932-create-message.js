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
      text: DataTypes.STRING,
      userId: keys('users'),
      messageStatusId: keys('message_status'),
    }, timestamps(3)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('messages');
  },
};
