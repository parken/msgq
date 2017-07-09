
export default function (sequelize, DataTypes) {
  const Group = sequelize.define('Group', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'groups',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        Group.belongsTo(db.User, {
          foreignKey: 'userId',
          allowNull: false,
        });
        Group.belongsTo(db.Route, {
          foreignKey: 'routeId',
          allowNull: true,
        });
        Group.belongsTo(db.SenderId, {
          foreignKey: 'senderId',
          allowNull: true,
        });
        Group.hasMany(db.GroupContact);
      },
    },
  });

  return Group;
}
