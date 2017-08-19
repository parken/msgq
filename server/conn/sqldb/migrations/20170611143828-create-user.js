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
      mobile: DataTypes.BIGINT,
      email: DataTypes.STRING(50),
      signature: DataTypes.STRING,
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
      supportMobile: DataTypes.BIGINT,
      supportEmail: DataTypes.STRING,
      loginUrl: DataTypes.STRING,
      companyName: DataTypes.STRING,
      companyAddress: DataTypes.STRING,
      companyLogo: DataTypes.STRING,
      admin: DataTypes.INTEGER,
      otp: DataTypes.STRING,
      otpStatus: DataTypes.INTEGER,
      password: DataTypes.STRING,
      slackUrl: DataTypes.STRING,
      slackActive: { type: DataTypes.BOOLEAN, defaultValue: 0 },
      smsActive: { type: DataTypes.BOOLEAN, defaultValue: 1 },
      active: { type: DataTypes.BOOLEAN, defaultValue: 1 },
      sellingBalanceTransactional: { type: DataTypes.INTEGER, defaultValue: 0 },
      sendingBalanceTransactional: { type: DataTypes.INTEGER, defaultValue: 0 },
      sellingBalancePromotional: { type: DataTypes.INTEGER, defaultValue: 0 },
      sendingBalancePromotional: { type: DataTypes.INTEGER, defaultValue: 0 },
      sellingBalanceSenderId: { type: DataTypes.INTEGER, defaultValue: 0 },
      sendingBalanceSenderId: { type: DataTypes.INTEGER, defaultValue: 0 },
      sellingBalanceOTP: { type: DataTypes.INTEGER, defaultValue: 0 },
      sendingBalanceOTP: { type: DataTypes.INTEGER, defaultValue: 0 },
      roleId: keys('roles'),
      appId: keys('apps'),
    }, timestamps(3)), engine)
      .then(() => queryInterface.addColumn('users', 'createdBy', keys('users')))
      .then(() => queryInterface.addColumn('users', 'resellerId', keys('users')));
  },
  down(queryInterface) {
    return queryInterface.dropTable('users');
  },
};
