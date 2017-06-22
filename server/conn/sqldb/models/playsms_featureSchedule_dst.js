/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_featureSchedule_dst', {
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
    schedule_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    schedule: {
      type: DataTypes.STRING(19),
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    scheduled: {
      type: DataTypes.STRING(19),
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    destination: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_featureSchedule_dst'
  });
};
