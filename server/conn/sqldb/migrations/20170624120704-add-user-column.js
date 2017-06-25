module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface
      .addColumn('users', 'transactionalStartFrom', { type: Sequelize.INTEGER, allowNull: false })
      .then(() => queryInterface
        .addColumn('users', 'transactionalPercent', { type: Sequelize.INTEGER, allowNull: false }))
      .then(() => queryInterface
        .addColumn('users', 'promotionalStartFrom', { type: Sequelize.INTEGER, allowNull: false }))
      .then(() => queryInterface
        .addColumn('users', 'promotionalPercent', { type: Sequelize.INTEGER, allowNull: false }))
      .then(() => queryInterface
        .addColumn('users', 'otpStartFrom', { type: Sequelize.INTEGER, allowNull: false }))
      .then(() => queryInterface
        .addColumn('users', 'otpPercent', { type: Sequelize.INTEGER, allowNull: false }))
      .then(() => queryInterface
        .addColumn('users', 'senderIdStartFrom', { type: Sequelize.INTEGER, allowNull: false }))
      .then(() => queryInterface
        .addColumn('users', 'senderIdPercent', { type: Sequelize.INTEGER, allowNull: false }))
      .then(() => queryInterface.addColumn('users', 'expiresAt', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      }));
  },

  down(queryInterface) {
    return queryInterface.removeColumn('users', 'transactionalStartFrom')
      .then(() => queryInterface.removeColumn('users', 'transactionalPercent'))
      .then(() => queryInterface.removeColumn('users', 'promotionalStartFrom'))
      .then(() => queryInterface.removeColumn('users', 'promotionalPercent'))
      .then(() => queryInterface.removeColumn('users', 'otpStartFrom'))
      .then(() => queryInterface.removeColumn('users', 'otpPercent'))
      .then(() => queryInterface.removeColumn('users', 'senderIdStartFrom'))
      .then(() => queryInterface.removeColumn('users', 'senderIdPercent'))
      .then(() => queryInterface.removeColumn('users', 'expiresAt'));
  },
};
