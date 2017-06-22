/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_gatewayTwilio_config', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    cfg_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'twilio'
    },
    cfg_url: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cfg_callback_url: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cfg_account_sid: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cfg_auth_token: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cfg_module_sender: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cfg_datetime_timezone: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_gatewayTwilio_config'
  });
};
