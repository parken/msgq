export default function (sequelize, DataTypes) {
  const Route = sequelize.define('Route', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  }, {
    tableName: 'routes',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate() {},
    },
  });

  return Route;
}
