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
      userId: keys('users'),
      messageFlyId: keys('messageFly'),
      upstreamPlanId: keys('upstreamPlans'),
      transactionStatusId: keys('transactionStatus'),
    }, timestamps(3)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('transactions');
  },
};
