/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_gatewayTelerivet', {
    c_timestamp: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    local_slid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    remote_slid: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: ''
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    phone_id: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: ''
    },
    message_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    source: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    error_text: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_gatewayTelerivet'
  });
};
