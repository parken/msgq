/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_featureBoard_log', {
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
    board_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    in_gateway: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    in_sender: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    in_masked: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    in_keyword: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    in_msg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    in_reply: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    in_datetime: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    }
  }, {
    tableName: 'playsms_featureBoard_log'
  });
};
