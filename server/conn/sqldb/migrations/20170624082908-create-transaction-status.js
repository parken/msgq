const { engine, timestamps } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('transactionStatus', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    }, timestamps(3)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('transactionStatus');
  },
};
