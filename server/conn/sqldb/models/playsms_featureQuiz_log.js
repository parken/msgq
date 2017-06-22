/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_featureQuiz_log', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    answer_id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    quiz_id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    quiz_answer: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    quiz_sender: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    in_datetime: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_featureQuiz_log'
  });
};
