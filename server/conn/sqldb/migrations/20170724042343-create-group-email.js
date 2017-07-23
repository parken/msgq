const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('group_emails', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: DataTypes.STRING,
      groupId: keys('groups'),
    }, timestamps(3)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('group_emails');
  },
};
