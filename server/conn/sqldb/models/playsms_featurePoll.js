/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_featurePoll', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    poll_id: {
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
    poll_title: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    poll_keyword: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    },
    poll_enable: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    poll_option_vote: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    poll_message_valid: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    poll_message_invalid: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    poll_message_option: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    poll_access_code: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: ''
    },
    smsc: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_featurePoll'
  });
};
