const Sequelize = require('sequelize');

const DataTypes = Sequelize.DataTypes;

module.exports = {
  engine: {
    engine: 'InnoDB',
    charset: 'utf8mb4',
  },
  keys(model) {
    return {
      type: DataTypes.INTEGER,
      references: {
        model,
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    };
  },
  timestamps(type) {
    const options = {
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    };

    if (type === 2) {
      options.updatedAt = {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      };
    }

    if (type === 3) {
      options.deletedAt = {
        type: Sequelize.DATE,
        defaultValue: null,
      };
    }

    return options;
  },
  getRouteType(routeId) {
    switch (routeId) {
      case 1: return 'Promotional';
      case 2: return 'Transactional';
      case 3: return 'SenderId';
      default: return 'OTP';
    }
  },
};
