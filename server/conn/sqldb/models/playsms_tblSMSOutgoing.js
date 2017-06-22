/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_tblSMSOutgoing', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    smslog_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      unique: true
    },
    flag_deleted: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    parent_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    p_gateway: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    p_smsc: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    p_src: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    p_dst: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    p_footer: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    p_msg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    p_datetime: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    p_update: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    p_status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    p_gpid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    p_credit: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.000'
    },
    p_sms_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    unicode: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    queue_code: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_tblSMSOutgoing'
  });
};
