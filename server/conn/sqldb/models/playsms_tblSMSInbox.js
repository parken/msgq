/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_tblSMSInbox', {
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
    in_sender: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    in_receiver: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    in_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    in_msg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    in_datetime: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    reference_id: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_tblSMSInbox'
  });
};
