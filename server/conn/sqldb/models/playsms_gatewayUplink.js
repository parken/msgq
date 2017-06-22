/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_gatewayUplink', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    up_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    up_local_smslog_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    up_remote_smslog_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    up_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    up_remote_queue_code: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ''
    },
    up_dst: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_gatewayUplink'
  });
};
