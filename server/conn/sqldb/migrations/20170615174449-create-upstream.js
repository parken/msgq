const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('upstreams', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      provider: DataTypes.STRING,
      link: DataTypes.STRING,
      comment: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      createdBy: keys('users'),
      updatedBy: keys('users'),
      smsTypeId: keys('smsTypes'),
    }, timestamps(3)), engine);
  },

  down(queryInterface) {
    return queryInterface.dropTable('upstreams');
  },
};
