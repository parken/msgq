/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_featurePoll_choice', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    choice_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    poll_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    choice_title: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: ''
    },
    choice_keyword: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_featurePoll_choice'
  });
};
