const { engine, timestamps } = require('../helper.js');

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
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      smsTypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'smsTypes',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    }, timestamps(3)), engine);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('upstreams');
  },
};
