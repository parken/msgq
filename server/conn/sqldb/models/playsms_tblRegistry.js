/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_tblRegistry', {
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
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    registry_group: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    registry_family: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    registry_key: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    registry_value: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'playsms_tblRegistry'
  });
};
