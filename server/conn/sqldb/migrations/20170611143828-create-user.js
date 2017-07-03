const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('users', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      mobile: {
        type: DataTypes.STRING(15),
        unique: true,
      },
      email: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      transactionalStartFrom: DataTypes.INTEGER,
      transactionalPercent: DataTypes.INTEGER,
      promotionalStartFrom: DataTypes.INTEGER,
      promotionalPercent: DataTypes.INTEGER,
      otpStartFrom: DataTypes.INTEGER,
      otpPercent: DataTypes.INTEGER,
      senderIdStartFrom: DataTypes.INTEGER,
      senderIdPercent: DataTypes.INTEGER,
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.fn('NOW'),
      },
      supportName: DataTypes.STRING,
      supportMobile: DataTypes.STRING,
      supportEmail: DataTypes.STRING,
      loginUrl: DataTypes.STRING,
      companyName: DataTypes.STRING,
      companyLogo: DataTypes.STRING,
      admin: DataTypes.INTEGER,
      otp: DataTypes.STRING,
      otpStatus: DataTypes.INTEGER,
      password: DataTypes.STRING,
      slackUrl: DataTypes.STRING,
      sellingBalance: DataTypes.INTEGER,
      sendingBalance: DataTypes.INTEGER,
      slackActive: { type: DataTypes.BOOLEAN, defaultValue: 0 },
      smsActive: { type: DataTypes.BOOLEAN, defaultValue: 1 },
      active: { type: DataTypes.BOOLEAN, defaultValue: 1 },
      roleId: keys('roles'),
    }, timestamps(3)), engine)
      .then(() => queryInterface.addColumn('users', 'createdBy', keys('users')))
      .then(() => queryInterface.addColumn('users', 'resellerId', keys('users')));
  },
  down(queryInterface) {
    return queryInterface.dropTable('users');
  },
};
