/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_gatewayTemplate_config', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    cfg_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'template'
    },
    cfg_path: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_gatewayTemplate_config'
  });
};
