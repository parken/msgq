/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_featureSubscribe_msg', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    msg_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    subscribe_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    msg: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
    },
    create_datetime: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    update_datetime: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    counter: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'playsms_featureSubscribe_msg'
  });
};
