/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_tblSMSIncoming', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    in_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    flag_deleted: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    in_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    in_feature: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    in_gateway: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    in_sender: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    in_receiver: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    in_keyword: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    in_message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    in_datetime: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    in_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'playsms_tblSMSIncoming'
  });
};
