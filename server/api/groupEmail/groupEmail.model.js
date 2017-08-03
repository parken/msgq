export default function (sequelize, DataTypes) {
  const GroupEmail = sequelize.define('GroupEmail', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: DataTypes.STRING,
  }, {
    tableName: 'group_emails',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        GroupEmail.belongsTo(db.Group, {
          foreignKey: 'groupId',
          allowNull: false,
        });
      },
    },
  });

  return GroupEmail;
}
