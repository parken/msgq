/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_featureBoard', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    board_id: {
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
    board_keyword: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    board_reply: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    board_forward_email: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    board_css: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    board_pref_template: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    board_access_code: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: ''
    },
    board_reply_msg: {
      type: DataTypes.STRING(140),
      allowNull: false,
      defaultValue: ''
    },
    smsc: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_featureBoard'
  });
};
