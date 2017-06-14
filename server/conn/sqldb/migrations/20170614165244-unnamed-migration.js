module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface
      .addColumn('users', 'supportName', { type: Sequelize.STRING, allowNull: true })
      .then(() => queryInterface
        .addColumn('users', 'supportMobile', { type: Sequelize.STRING(12), allowNull: true }))
      .then(() => queryInterface
        .addColumn('users', 'supportEmail', { type: Sequelize.STRING, allowNull: true }))
      .then(() => queryInterface
        .addColumn('users', 'loginUrl', { type: Sequelize.STRING, allowNull: true }))
      .then(() => queryInterface
        .addColumn('users', 'companyName', { type: Sequelize.STRING, allowNull: true }))
      .then(() => queryInterface
        .addColumn('users', 'companyLogo', { type: Sequelize.STRING, allowNull: true }))
      .then(() => queryInterface
        .addColumn('users', 'createdBy', {
          type: Sequelize.INTEGER,
          model: 'users',
          key: 'id',
          allowNull: true,
          defaultValue: null,
        }))
      ;
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'supportName')
      .then(() => queryInterface.removeColumn('users', 'supportMobile'))
      .then(() => queryInterface.removeColumn('users', 'supportEmail'))
      .then(() => queryInterface.removeColumn('users', 'loginUrl'))
      .then(() => queryInterface.removeColumn('users', 'companyName'))
      .then(() => queryInterface.removeColumn('users', 'companyLogo'))
      .then(() => queryInterface.removeColumn('users', 'createdBy'));
  },
};
