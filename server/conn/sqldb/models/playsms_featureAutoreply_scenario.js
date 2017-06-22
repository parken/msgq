/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_featureAutoreply_scenario', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    autoreply_scenario_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    autoreply_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    autoreply_scenario_param1: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    autoreply_scenario_param2: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    autoreply_scenario_param3: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    autoreply_scenario_param4: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    autoreply_scenario_param5: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    autoreply_scenario_param6: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    autoreply_scenario_param7: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    autoreply_scenario_result: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'playsms_featureAutoreply_scenario'
  });
};
