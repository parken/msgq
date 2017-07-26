const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('contacts', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      number: DataTypes.STRING,
      userId: keys('users'),
    }, timestamps(3)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('contacts');
  },
};
