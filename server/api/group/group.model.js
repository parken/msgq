
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
  });

  return Group;
}
