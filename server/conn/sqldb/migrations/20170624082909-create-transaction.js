const { engine, timestamps } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('transactions', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      messageId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'messages',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      userPackageId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user_packages',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    }, timestamps(3)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('transactions');
  },
};
