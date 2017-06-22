/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_featureMsgtemplate', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    tid: {
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
    t_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    t_text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'playsms_featureMsgtemplate'
  });
};
