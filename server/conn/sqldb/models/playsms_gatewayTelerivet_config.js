/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_gatewayTelerivet_config', {
    c_timestamp: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    cfg_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'telerivet'
    },
    cfg_url: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cfg_api_key: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cfg_project_id: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cfg_status_url: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    cfg_status_secret: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    tableName: 'playsms_gatewayTelerivet_config'
  });
};
