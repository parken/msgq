/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_featureSendfromfile', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    sid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    sms_datetime: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    sms_to: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    sms_msg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sms_username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_featureSendfromfile'
  });
};
