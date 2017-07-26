export default function (sequelize, DataTypes) {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'roles',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate() {},
    },
  });

  return Role;
}
