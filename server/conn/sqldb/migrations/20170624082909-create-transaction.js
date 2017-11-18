const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('transactions', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      count: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      messageFlyId: keys('message_fly'),
      upstreamId: keys('upstreams'),
      transactionStatusId: keys('transaction_status'),
    }, timestamps(3)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('transactions');
  },
};
