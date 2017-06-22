/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_featureSimplerate', {
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
    dst: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    prefix: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: '',
      unique: true
    },
    rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.000'
    }
  }, {
    tableName: 'playsms_featureSimplerate'
  });
};
