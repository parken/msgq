const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('domains', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      status: DataTypes.INTEGER,
      classkey: DataTypes.STRING,
      price: DataTypes.STRING,
      existing: DataTypes.BOOLEAN,
      expiresAt: { type: DataTypes.DATE },
      userId: keys('users'),
      domainTypeId: keys('domain_types'),
    }, timestamps(3)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('domains');
  },
};
