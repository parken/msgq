const { engine, timestamps } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('senderId', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      blockReason: DataTypes.STRING,
      company: DataTypes.STRING,
      message: DataTypes.STRING,
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      upstreamId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'upstreams',
          key: 'id',
        },
        allowNull: true,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    }, timestamps(3)), engine);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('senderId');
  },
};
