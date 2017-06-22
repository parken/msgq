/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_tblCountry', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    country_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    country_name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
    },
    country_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    },
    country_prefix: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_tblCountry'
  });
};
