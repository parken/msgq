/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_featureQuiz', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    quiz_id: {
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
    quiz_keyword: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    quiz_question: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    quiz_answer: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    quiz_msg_correct: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    quiz_msg_incorrect: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    quiz_enable: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    smsc: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'playsms_featureQuiz'
  });
};
