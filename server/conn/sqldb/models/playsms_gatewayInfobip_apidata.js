/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_gatewayInfobip_apidata', {
    c_timestamp: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    apidata_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    smslog_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    apimsgid: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    status: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'playsms_gatewayInfobip_apidata'
  });
};
