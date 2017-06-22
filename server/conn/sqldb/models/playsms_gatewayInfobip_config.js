/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_gatewayInfobip_config', {
    c_timestamp: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    cfg_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'infobip'
    },
    cfg_username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    cfg_password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    cfg_module_sender: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    cfg_send_url: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    cfg_credit: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    cfg_additional_param: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    cfg_datetime_timezone: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    cfg_dlr_nopush: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'playsms_gatewayInfobip_config'
  });
};
