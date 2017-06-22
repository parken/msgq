const { engine, keys } = require('../helper.js');
const { db } = require('../../../config/environment');

module.exports = {
  up: function(queryInterface, DataTypes) {
    return queryInterface.createTable(`${db.pref}_tblUser`, {
      c_timestamp: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: '0'
      },
      parent_uid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      },
      uid: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      status: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      },
      acl_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: ''
      },
      password: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: ''
      },
      token: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: ''
      },
      enable_webservices: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      },
      webservices_ip: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: ''
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: ''
      },
      mobile: {
        type: DataTypes.STRING(16),
        allowNull: false,
        defaultValue: ''
      },
      email: {
        type: DataTypes.STRING(250),
        allowNull: false,
        defaultValue: ''
      },
      sender: {
        type: DataTypes.STRING(16),
        allowNull: false,
        defaultValue: ''
      },
      footer: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: ''
      },
      address: {
        type: DataTypes.STRING(250),
        allowNull: false,
        defaultValue: ''
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: ''
      },
      state: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: ''
      },
      country: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      },
      zipcode: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: ''
      },
      credit: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: '0.000'
      },
      adhoc_credit: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: '0.000'
      },
      datetime_timezone: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: ''
      },
      language_module: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: ''
      },
      fwd_to_mobile: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      },
      fwd_to_email: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '1'
      },
      fwd_to_inbox: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '1'
      },
      replace_zero: {
        type: DataTypes.STRING(5),
        allowNull: false,
        defaultValue: ''
      },
      plus_sign_remove: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '1'
      },
      plus_sign_add: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      },
      send_as_unicode: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      },
      local_length: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '9'
      },
      register_datetime: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
      },
      lastupdate_datetime: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '0000-00-00 00:00:00'
      },
      flag_deleted: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 1
      },
      groupId: keys('groups'),
      otp: DataTypes.STRING,
      otpStatus: DataTypes.INTEGER,
      active: { type: DataTypes.BOOLEAN, defaultValue: 1 },
    }, engine);
  },
  down: function(queryInterface) {
    return queryInterface.dropTable(`${db.pref}_tblUser`);
  }
};
