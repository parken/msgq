/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_featureCustom', {
    c_timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    custom_id: {
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
    service_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    custom_keyword: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    sms_receiver: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    custom_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    custom_return_as_reply: {
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
    tableName: 'playsms_featureCustom'
  });
};
