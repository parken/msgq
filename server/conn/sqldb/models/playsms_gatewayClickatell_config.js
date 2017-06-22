/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_gatewayClickatell_config', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    cfg_name: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: 'clickatell'
    },
    cfg_api_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cfg_username: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cfg_password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cfg_module_sender: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cfg_send_url: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cfg_incoming_path: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cfg_credit: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    cfg_additional_param: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cfg_datetime_timezone: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_gatewayClickatell_config'
  });
};
