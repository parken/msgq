export default function (sequelize, DataTypes) {
  const Template = sequelize.define('Template', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    tableName: 'templates',
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate(db) {
        Template.belongsTo(db.User, {
          foreignKey: 'userId',
          allowNull: false,
        });
      },
    },
  });

  return Template;
}
