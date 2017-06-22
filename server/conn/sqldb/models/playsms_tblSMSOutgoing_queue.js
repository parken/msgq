/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_tblSMSOutgoing_queue', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    queue_code: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: '',
      unique: true
    },
    datetime_entry: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '000-00-00 00:00:00'
    },
    datetime_scheduled: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '000-00-00 00:00:00'
    },
    datetime_update: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '000-00-00 00:00:00'
    },
    flag: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    queue_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    sms_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    gpid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    sender_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    footer: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sms_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    unicode: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    smsc: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_tblSMSOutgoing_queue'
  });
};
