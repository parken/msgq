/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_featureSubscribe', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    subscribe_id: {
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
    subscribe_keyword: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    subscribe_msg: {
      type: DataTypes.STRING(140),
      allowNull: false,
      defaultValue: ''
    },
    unsubscribe_msg: {
      type: DataTypes.STRING(140),
      allowNull: false,
      defaultValue: ''
    },
    subscribe_enable: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    subscribe_param: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    unsubscribe_param: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    forward_param: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    unknown_format_msg: {
      type: DataTypes.STRING(140),
      allowNull: false,
      defaultValue: ''
    },
    already_member_msg: {
      type: DataTypes.STRING(140),
      allowNull: false,
      defaultValue: ''
    },
    smsc: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    duration: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    expire_msg: {
      type: DataTypes.STRING(140),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_featureSubscribe'
  });
};
