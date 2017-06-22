/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playsms_tblNotif', {
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
    last_update: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    body: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    flag_unread: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    data: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'playsms_tblNotif'
  });
};
